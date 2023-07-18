import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import styles from '../../styles/Home.module.css'

interface SearchBlockProps {
    searchTerm: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchResults: object[];
}

export const SearchBlock: React.FC<SearchBlockProps> = ({ searchTerm, handleSearch, searchResults }) => {

    return (<Grid container justifyContent="flex-end" alignItems="center" spacing={1} className="m-2 pr-5">
                <Grid item>              
                    <Typography variant="h6" className={styles['number-list']}>
                    {searchResults.length}
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField size="small" id="outlined-basic" label="Filter podcasts..." variant="outlined" value={searchTerm} onChange={handleSearch} />
                </Grid>
            </Grid>);
}