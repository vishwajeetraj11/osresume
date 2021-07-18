import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useMediaQuery } from '@material-ui/core';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import LeftSideBar from '../../components/LeftSideBar';
import Loader from '../../components/Loader';
import RightSideBar from '../../components/RightSideBar';
import Onyx from '../../components/templates/Onyx';
import Trical from '../../components/templates/Trical';
import {
  addEducationData,
  addExperienceData,
  addExtrasData,
  addPersonalDataState,
  addResumeMetaData,
} from '../../redux/actions/resumeActions';

const Editor = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const desktop = useMediaQuery('(min-width:1024px)');
  const resume = useSelector(state => state.resume);
  const { data: resumeData, metadata } = resume;
  const resumeRef = useRef();
  const [loading, setLoading] = useState(false);

  const { title } = metadata;
  const { username } = resumeData?.personalData;

  const handlePrint = useReactToPrint({
    documentTitle: title || 'Your Resume',
    content: () => resumeRef.current,
    /* eslint-disable no-tabs */
    pageStyle: `
			@page {
				margin: 0;
				padding: 0;
				overflow: hidden;
				height: 0; 
			}
			@media print {
				footer {display: none;}
				header {display: none;}
				html,body {
					overflow: hidden;
					border: 1px solid white;
					height: 100%;
					page-break-after: avoid;
					page-break-before: avoid;
					margin:0;
					padding:0;
					font-size: 100%;
				}
			}
			`,
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios({
          url: `/api/resumes/${router.query.id}`,
          method: 'GET',
        });
        // console.log(data);
        const personalData = data.resume.personal
          ? data.resume.personal
          : { name: '', email: '', phoneNumber: '', designation: '', country: '', objective: '' };
        dispatch(
          addResumeMetaData({
            title: data.resume.title,
            createdAt: data.resume.createdAt,
            resumeId: data.resume._id,
            userId: data.resume.userId,
            templateName: data.resume.templateName,
            customStyles: data.resume.customStyles,
          }),
        );
        dispatch(addExperienceData(data.resume.experience));
        dispatch(addExtrasData(data.resume.extras));
        dispatch(addPersonalDataState(personalData));
        dispatch(addEducationData(data.resume.education));

        const fontID = data.resume.customStyles.font.replace(/ /g, '+');
        const head = document.getElementsByTagName('head')[0];
        const link = document.createElement('link');
        link.id = fontID;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `https://fonts.googleapis.com/css?family=${fontID}:wght@100;300;400;500;600;700;900`;
        link.media = 'all';
        head.appendChild(link);
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [router.query.id, dispatch]);

  const render = () => {
    if (loading) {
      return <Loader fullScreen />;
    }
    if (desktop) {
      return (
        <div className="flex flex-col lg:flex-row bg-gray-50">
          <LeftSideBar />
          <div className="order-2 mx-auto my-10">
            {metadata.templateName === 'Onyx' && <Onyx ref={resumeRef} data={resumeData} customStyles={metadata.customStyles} />}
            {metadata.templateName === 'Trical' && <Trical ref={resumeRef} data={resumeData} customStyles={metadata.customStyles} />}
          </div>
          <RightSideBar handlePrint={handlePrint} />
        </div>
      );
    }
    return <div className="">Please switch to desktop for better experience.</div>;
  };

  return (
    <>
      <Head>
        <title>{username ? `${username} | OS Resume` : 'Resume Editor | OS Resume'}</title>
      </Head>
      <SignedIn>{render()}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Editor;
