import Layout from '../components/Layout';
import ModalDialog from '../components/ModalDialog';
import NFTetrisAppBar from '../components/NFTetrisAppBar';

export default function Custom500() {
	return (
		<Layout>
			<div className="main" style={{ minHeight: '100vh' }}>
				<NFTetrisAppBar />
				<ModalDialog
					open={true}
					dialogBox="error"
					title="500 Error"
					message="Ooops! An internal Server Error occured."
				/>
			</div>
		</Layout>
	);
}
