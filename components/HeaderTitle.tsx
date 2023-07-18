import styles from '../styles/Home.module.css'
import Typography from '@mui/material/Typography';
 
export const HeaderTitle: React.FC = () => {
  return (
    <Typography gutterBottom variant="h5" component="div" className={styles['header-title']}>
      Podcaster
    </Typography>
  );
};