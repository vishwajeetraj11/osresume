import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useMediaQuery } from '@material-ui/core';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import LeftSideBar from '../../components/LeftSideBar';
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

  const username = resumeData?.personalData?.name;

  const handlePrint = useReactToPrint({
    documentTitle: username || 'Your Resume',
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
          }),
        );
        dispatch(addExperienceData(data.resume.experience));
        dispatch(addExtrasData(data.resume.extras));
        dispatch(addPersonalDataState(personalData));
        dispatch(addEducationData(data.resume.education));
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [router.query.id, dispatch]);

  return (
    <>
      <Head>
        <title>{username ? `${username} | OS Resume` : 'Resume Editor | OS Resume'}</title>
      </Head>
      <SignedIn>
        {desktop ? (
          <div className="flex flex-col lg:flex-row bg-gray-50">
            <LeftSideBar />
            <div className="order-2 mx-auto my-10">
              {metadata.templateName === 'Onyx' && <Onyx ref={resumeRef} data={resumeData} />}
              {metadata.templateName === 'Trical' && <Trical ref={resumeRef} data={resumeData} />}
            </div>
            <RightSideBar handlePrint={handlePrint} />
          </div>
        ) : (
          <div className="">Please switch to desktop for better experience.</div>
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Editor;
