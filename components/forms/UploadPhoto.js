import { Button } from '@material-ui/core';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDispatch } from 'react-redux';
import { addPhoto } from '../../redux/actions/resumeActions';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// import Cropper from "react-cropper";

const UploadPhoto = ({ closeDrawer }) => {
	const dispatch = useDispatch();
	function generateDownload(canvas, crop) {
		if (!crop || !canvas) {
			return;
		}

		canvas.toBlob(
			(blob) => {
				// const previewUrl = window.URL.createObjectURL(blob);
				const previewUrl = URL.createObjectURL(blob);
				dispatch(
					addPhoto({
						src: previewUrl,
					})
				);
				const anchor = document.createElement('a');
				anchor.download = 'cropPreview.png';
				anchor.href = URL.createObjectURL(blob);
				// anchor.click();
				closeDrawer();
				// window.URL.revokeObjectURL(previewUrl);
			},
			'image/png',
			1
		);
	}

	const [upImg, setUpImg] = useState();
	const imgRef = useRef(null);
	const uploadRef = useRef(null);
	const previewCanvasRef = useRef(null);
	const [crop, setCrop] = useState({
		unit: 'px',
		width: 300,
		height: 300,
		aspect: 1 / 1,
	});
	const [completedCrop, setCompletedCrop] = useState(null);

	const onSelectFile = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener('load', () => setUpImg(reader.result));
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	useEffect(() => {
		if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
			return;
		}

		const image = imgRef.current;
		const canvas = previewCanvasRef.current;
		const crop = completedCrop;

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		const ctx = canvas.getContext('2d');
		const pixelRatio = window.devicePixelRatio;

		canvas.width = crop.width * pixelRatio;
		canvas.height = crop.height * pixelRatio;

		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.imageSmoothingQuality = 'high';

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);
		// ctx.drawImage(
		// 	image,
		// 	0,
		// 	0,
		// 	image.width,
		// 	image.height,
		// 	0,
		// 	0,
		// 	canvas.width,
		// 	canvas.height
		// );
	}, [completedCrop]);

	const onUpload = () => {
		uploadRef.current.click();
	};

	return (
		<div className='mb-10 w-screen'>
		<Button
		className='px-4 py-2 mr-4'
		onClick={() => closeDrawer()}
		color='default'
		variant='text'
		>
		{' '}
		<ArrowBackIcon /><p className='ml-2 capitalize'>Back</p>
	</Button>
			<div className='mt-6 mb-6'>
				<input
					ref={uploadRef}
					type='file'
					hidden
					accept='image/*'
					onChange={onSelectFile}
				/>
				<Button onClick={onUpload} variant='outlined' type='button'>
					Upload Image
				</Button>
			</div>
			<ReactCrop
				// keepSelection
                circularCrop
				imageStyle={{ objectFit: 'contain' }}
				style={{
					// height: 500,
				}}
                ruleOfThirds
				className='ReactCrop-opt'
				src={upImg}
				onImageLoaded={onLoad}
				crop={crop}
				onChange={(c) => setCrop(c)}
				onComplete={(c) => setCompletedCrop(c)}
			/>
			<div className='mb-8'>
                <h3 className='my-6 text-xl font-semibold'>Preview</h3>
				<canvas
					ref={previewCanvasRef}
					// Rounding is important so the canvas width and height matches/is a multiple for sharpness.
					style={{
						width: Math.round(completedCrop?.width ?? 0),
						height: Math.round(completedCrop?.height ?? 0),
					}}
				/>
			</div>

			<Button
				variant='outlined'
				type='button'
				disabled={!completedCrop?.width || !completedCrop?.height}
				onClick={() =>
					generateDownload(previewCanvasRef.current, completedCrop)
				}
			>
				Update Image
			</Button>
		</div>
	);
};

export default UploadPhoto;
