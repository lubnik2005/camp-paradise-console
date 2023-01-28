import { useState } from 'react';
import { sentenceCase } from 'change-case';
// routes
// @mui
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    Link,
    Table,
    Divider,
    MenuItem,
    TableRow,
    TableBody,
    TableCell,
    CardProps,
    CardHeader,
    Typography,
    TableContainer,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import MenuPopover from '../../../../components/menu-popover';
import { TableHeadCustom } from '../../../../components/table';
import SvgColor from '../../../../components/svg-color';

// ----------------------------------------------------------------------

type RowProps = {
    id: number;
    name: string;
    required: boolean;
    status: string;
    completedOn: string;
};

interface Props extends CardProps {
    title?: string;
    subheader?: string;
    tableLabels: any;
    tableData: RowProps[];
}

export default function Forms({
    title,
    subheader,
    tableLabels,
    tableData,
    ...other
}: Props) {
    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

            <TableContainer sx={{ overflow: 'unset' }}>
                <Scrollbar>
                    <Table sx={{ minWidth: 960 }}>
                        <TableHeadCustom headLabel={tableLabels} />

                        <TableBody>
                            {tableData.map((row) => (
                                <BookingDetailsRow key={row.id} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>

            <Divider />
        </Card>
    );
}

// ----------------------------------------------------------------------

type BookingDetailsRowProps = {
    row: RowProps;
};

function BookingDetailsRow({ row }: BookingDetailsRowProps) {
    const theme = useTheme();

    const isLight = theme.palette.mode === 'light';

    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const handleDownload = () => {
        handleClosePopover();
        console.log('DOWNLOAD', row.id);
    };

    const handlePrint = () => {
        handleClosePopover();
        console.log('PRINT', row.id);
    };

    const handleShare = () => {
        handleClosePopover();
        console.log('SHARE', row.id);
    };

    const handleDelete = () => {
        handleClosePopover();
        console.log('DELETE', row.id);
    };

    return (
        <>
            <TableRow>
                <TableCell>
                    <Link component={RouterLink} to={PATH_DASHBOARD.general.form(row.id)} >
                        <Typography variant="subtitle2">{row.name}</Typography>
                    </Link>
                </TableCell>
                <TableCell>
                    {row.required ?
                        <SvgColor src="/assets/icons/navbar/ic_check-circle.svg" />
                        : <SvgColor src="/assets/icons/navbar/ic_cancel.svg" />
                    }

                </TableCell>
                <TableCell>
                    <Label
                        variant={isLight ? 'soft' : 'filled'}
                        color={
                            (row.status === 'completed' && 'success') ||
                            (row.status === 'incomplete' && 'warning') ||
                            'error'
                        }
                    >
                        {sentenceCase(row.status)}
                    </Label>
                </TableCell>
            </TableRow>

            <MenuPopover
                open={openPopover}
                onClose={handleClosePopover}
                arrow="right-top"
                sx={{ width: 160 }}
            >
                <MenuItem onClick={handleDownload}>
                    <Iconify icon="eva:download-fill" />
                    Download
                </MenuItem>

                <MenuItem onClick={handlePrint}>
                    <Iconify icon="eva:printer-fill" />
                    Print
                </MenuItem>

                <MenuItem onClick={handleShare}>
                    <Iconify icon="eva:share-fill" />
                    Share
                </MenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <Iconify icon="eva:trash-2-outline" />
                    Delete
                </MenuItem>
            </MenuPopover>
        </>
    );
}
