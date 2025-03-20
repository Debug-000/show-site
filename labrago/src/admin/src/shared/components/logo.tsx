import type { FC } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';


interface LogoProps {
    color?: any;
}
export const Logo: FC<LogoProps> = (props) => {
    const { color: colorProp } = props;
    const theme = useTheme();

    const color = 'var(--mui-palette-text-secondary)';

    return (
        <Box tabIndex={0} sx={{
            outlineWidth: '0px',
            height: '35px'
        }}>
            <svg width="35" height="35" viewBox="0 0 297 293" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M199.34 163.773C273.5 154.5 296 106.5 296 85C295.156 86.3716 294.306 87.7396 293.434 89.0938C281.016 105.605 259.56 111.311 240.352 115.406L236.563 116.188C217.922 120.1 198.913 121.822 179.919 122.911L177.848 123.027C171.543 123.383 165.238 123.725 158.931 124.046C142.263 124.89 65.9998 119 66 203.5C107.5 165 139.5 170 199.34 163.773Z" fill={color} />
                <path d="M243.831 27C243.024 18.2839 240.81 5.86032 233.831 0C208.331 72 107.767 88.8018 106.331 89.5C86.3306 98.5 68.7723 107.861 58.8188 124.328C51.3446 138.096 57.1361 153.021 61.5 168.5C75.5 122.5 108.5 119.5 167.3 105.909C190.831 103 227.468 84.5383 236.831 65C243.34 52.8931 244.881 40.5168 243.831 27Z" fill={color} />
                <path d="M146.336 262C127.96 236.875 128.399 206.138 131.899 176.461C78.4999 190.5 85.1254 214.009 87.258 221.531L88.3361 225C91.5289 235.487 94.3737 245.758 100.336 255C120.336 286 151.336 296.5 182.336 291C168.515 285.779 157.104 276.25 148.207 264.578L146.336 262Z" fill={color} />
                <path d="M104 74.8816C101.5 65.3816 92.7887 58.1646 87.9297 54.9793C68.3163 43.8226 47.9091 52.6996 34 68.8816C23.1473 81.2043 23.1473 81.2043 9 89.8816C5.47962 91.956 2.7962 93.8783 0 96.8816C4.68091 96.1015 9.24228 95.802 13.9922 95.7625C38.5 95.5582 47.2825 111.559 52 120.882C62.5 88.3816 102.892 75.3186 104 74.8816Z" fill={color} />
            </svg>
        </Box>
    );
};