import {
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            maxWidth: 800
        },

        responseInput: {
            marginTop: 16,
            width: '100%'
        },

        button: {
            marginTop: 24,
            marginRight: 8,
        },

        rejectButton: {
            marginTop: 24,
            marginRight: 8,
            background: theme.palette.error.main,
            color: 'white'
        }
    })
)

export default useStyles;