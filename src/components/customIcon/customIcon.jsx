import React from 'react';
import AbcIcon from '@mui/icons-material/Abc';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AnchorIcon from '@mui/icons-material/Anchor';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import BuildIcon from '@mui/icons-material/Build';
import CakeIcon from '@mui/icons-material/Cake';
import CampaignIcon from '@mui/icons-material/Campaign';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import ElderlyIcon from '@mui/icons-material/Elderly';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import HotelIcon from '@mui/icons-material/Hotel';
import RadarIcon from '@mui/icons-material/Radar';
import GppBadIcon from '@mui/icons-material/GppBad';

const icons = {
    abc: AbcIcon,
    wallet: AccountBalanceWalletIcon,
    agriculture: AgricultureIcon,
    bayraktar: AirplanemodeActiveIcon,
    anchor: AnchorIcon,
    city: ApartmentIcon,
    powerBank: BatteryChargingFullIcon,
    repair: BuildIcon,
    carRepair: CarRepairIcon,
    win: CakeIcon,
    alarm: CampaignIcon,
    elderly: ElderlyIcon,
    tea: EmojiFoodBeverageIcon,
    love: FavoriteIcon,
    gitHub: GitHubIcon,
    sleep: HotelIcon,
    radar: RadarIcon,
    ddos: GppBadIcon
}

export const CustomIcon = ({iconName, ...other}) => {
    const SpecificIcon = icons[iconName];
    return SpecificIcon ? (
        <SpecificIcon {...other}/>
    ) : null;
}

export const availableIconKeys = () => {
    return Object.keys(icons);
}
