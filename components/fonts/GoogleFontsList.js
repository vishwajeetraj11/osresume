import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_FONT } from '../../redux/actionTypes/resumeActionTypes';
import { items } from '../../shared/googleFonts.json';
import addFontInHeadTag from '../../shared/utils/addFontInHeadTag';

const GoogleFontsList = ({ anchor, closeDrawer }) => {
  const [googleFonts, setGoogleFonts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(10);
  const [bound, setBound] = useState(20);
  const [fontsAdded, setFontsAdded] = useState([]);
  const dispatch = useDispatch();

  const { resumeId } = useSelector(state => state.resume.metadata);

  // Search
  const [search, setSearch] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const showSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line global-require
      const fonts = require('../../shared/googleFonts.json');
      const found = fonts.items.filter(font => {
        if (font.family.toLowerCase().startsWith(search.toLowerCase())) {
          return true;
        }
        return false;
      });
      setTotalPages(Math.ceil(found.length / 20));
      setGoogleFonts(
        found.slice(0, 40).map(e => ({
          fontFamily: e.family,
          fontID: e.family.replace(/ /g, '+'),
        })),
      );
    })();
  }, [search]);

  useEffect(() => {
    if (googleFonts.length !== 0) {
      if (page === 0) {
        setGoogleFonts(
          items.slice(page, bound).map(e => ({
            fontFamily: e.family,
            fontID: e.family.replace(/ /g, '+'),
          })),
        );
      } else if (page > 0) {
        setGoogleFonts(
          items.slice(page * bound, page * bound + bound).map(e => ({
            fontFamily: e.family,
            fontID: e.family.replace(/ /g, '+'),
          })),
        );
      }
    }
  }, [page]);

  const handlePage = type => {
    if (type === 'NEXT') {
      setPage(p => p + 1);
    } else if (type === 'PREV') {
      if (page === 0) return;
      setPage(p => p - 1);
    }
  };

  return (
    <div className={`${googleFonts.length === 0 ? 'pb-0' : 'pb-10'} relative`}>
      <div
        className="pl-10 pt-6 pb-4 flex items-center fixed bottom-0 lg:bottom-auto lg:top-0 bg-white z-10 w-full flex-wrap"
        style={{ boxShadow: '10px 0 20px rgb(0 0 0 / 7%)' }}
      >
        <Button className="px-4 py-2" onClick={() => closeDrawer()} color="default" variant="text">
          {' '}
          <ArrowBackIcon />
          <p className="ml-2">Back</p>
        </Button>
        <Button className="px-4 py-2 ml-4" disabled={page === 0} onClick={() => handlePage('PREV')} color="primary" variant="outlined">
          {' '}
          <ArrowBackIosIcon />
          <p className="ml-4">Previous</p>
        </Button>

        {/* {!!totalPages && <p className="ml-4">{`${totalPages} / ${page + 1}`}</p>} */}

        <Button
          className="px-4 py-2 ml-4"
          disabled={totalPages === page + 1}
          onClick={() => handlePage('NEXT')}
          color="primary"
          variant="outlined"
        >
          {' '}
          <p className="mr-2">Next</p>
          <div style={{ transform: 'rotate(-180deg)' }}>
            <ArrowBackIosIcon />
          </div>
        </Button>

        <TextField
          id="search"
          className="ml-4 self-end mt-4 lg:mt-0 w-full lg:w-max pr-10 lg:pr-0"
          size="small"
          rows={1}
          variant="outlined"
          onChange={e => setSearch(e.target.value)}
          label="Search Fonts"
          value={search}
        />
      </div>
      <div className="mt-12 lg:mt-24 pl-10">
        {googleFonts.length === 0 ? (
          <div className="-mt-12 lg:-mt-24 flex items-center justify-center flex-col h-screen">
            <img
              src="/images/fontnotfound.png"
              className="w-11/12 object-contain"
              style={{ height: 'max-content' }}
              alt="Not Found Illustration"
            />
            <h4 className="text-xl font-medium text-gray-600">The font you are looking for is not available.</h4>
          </div>
        ) : (
          googleFonts.map((font, index) => {
            const onClick = (fontFamily, fontID) => {
              let fontAvailable;
              const resume = document.getElementById('t1');

              document.fonts.ready
                .then(async () => {
                  // Check if the font is in the system
                  fontAvailable = document.fonts.check(`16px ${fontFamily}`);

                  // Check if font is already added via web to avoid refetching of same font
                  if (fontsAdded.length > 4) {
                    const fontID = fontsAdded[fontsAdded.length - 1];
                    setFontsAdded(p => p.filter((_, i) => i !== fontsAdded.length - 1));
                    const fontNode = document.getElementById(fontID);
                    fontNode.remove();
                  }

                  try {
                    showSnack('Updating font...', 'default');
                    const { data } = await axios({
                      url: `/api/resumes/${resumeId}`,
                      method: 'PATCH',
                      data: {
                        customStyles: {
                          font: fontFamily,
                        },
                      },
                    });

                    dispatch({
                      type: UPDATE_FONT,
                      payload: data.resume.customStyles.font,
                    });
                    showSnack('Successfully updated font.', 'success');
                  } catch (e) {
                    showSnack('Unable to update font, please try again later.', 'error');
                  }

                  // Check if the font is already available in users system to avoid fetching
                  if (fontAvailable || fontsAdded.includes(fontID)) resume.style.fontFamily = fontFamily;
                  // Fetch fonts
                  else {
                    addFontInHeadTag(fontID);
                    setFontsAdded(p => p.concat(fontID));
                    resume.style.fontFamily = fontFamily;
                  }
                })
                .catch(e => console.log(e));
            };
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="max-w-max">
                <Button variant="outlined" className="mt-6" onClick={() => onClick(font.fontFamily, font.fontID)}>
                  <p className="capitalize">{font.fontFamily}</p>
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GoogleFontsList;

// Good Google Fonts
// Mulish
