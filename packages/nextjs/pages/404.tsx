import Layout from '../components/Layout';
import ModalDialog from '../components/ModalDialog';
import NFTetrisAppBar from '../components/NFTetrisAppBar';

export default function Custom404() {
	return (
		<Layout>
			<div className="main" style={{ minHeight: '100vh' }}>
				<NFTetrisAppBar />
				<ModalDialog
					open={true}
					dialogBox="error"
					title="404 Error"
					message="Ooops! The requested page is not on the server."
				/>
			</div>
		</Layout>
	);
}
