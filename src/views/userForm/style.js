import { makeStyles } from '@material-ui/core/styles';

const userFormStyles = makeStyles((theme) => ({
	root: {
		minWidth: '100vw',
		backgroundImage:
			'url(https://www.wallpapertip.com/wmimgs/183-1834910_geometric-minimalist-abstract-background.png)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'bottom',
		minHeight: 'calc(100vh - 64px)',
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		'@media (max-height: 550px)': {
			minHeight: 600,
		},

		'& .main-container': {
			maxWidth: '530px',
			widhth: '100%',
			margin: 'auto',
			padding: '40px',

			'@media (max-width: 550px)': {
				margin: '20px',
				padding: '30px',
			},
		},

		'& form': {
			marginTop: '30px',

			'@media (max-width: 575px)': {
				marginTop: '15px',
			},
			'& .MuiInputBase-input': {
				height: '20px',
				'@media (max-width: 575px)': {
					height: '10px',
				},
			},
		},

		'& .btn-container': {
			display: 'flex',
			justifyContent: 'space-between',
		},
		'& .custom-btn': {
			marginTop: '20px',
			fontSize: '18px',
			height: '50px',

			'@media (max-width: 575px)': {
				marginTop: '15px',
				height: '40px',
			},
		},
	},
}));

export { userFormStyles };
