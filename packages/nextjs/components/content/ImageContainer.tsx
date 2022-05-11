import styled from 'styled-components';

const ImgDiv = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	& > img {
		max-width: 85%;
		border: 2px solid rgba(0, 0, 0, 0.18);
	}
`;

type ImageContainerProps = {
	children: React.ReactNode;
};

const ImageContainer = (props: ImageContainerProps) => {
	return <ImgDiv>{props.children}</ImgDiv>;
};

export default ImageContainer;
