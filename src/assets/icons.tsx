import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

import { ChevronLeft, ChevronRight, Cloud } from 'lucide-react';
import alignCenterHorizontal from './svg/align-center-horizontal.svg';
import arrowCircleUp from './svg/arrow-circle-up.svg';
import arrowDownNarrowWide from './svg/arrow-down-narrow-wide.svg';
import arrowDownWideNarrow from './svg/arrow-down-wide-narrow.svg';
import arrowLeftRight from './svg/arrow-left-right.svg';
import arrowLeft from './svg/arrow-left.svg';
import arrowRight2 from './svg/arrow-right-2.svg';
import arrowRight3 from './svg/arrow-right-3.svg';
import arrowRight from './svg/arrow-right.svg';
import arrowUpDown from './svg/arrow-up-down.svg';
import arrowUpRight2 from './svg/arrow-up-right-2.svg';
import arrowUpRight from './svg/arrow-up-right.svg';
import arrowUp from './svg/arrow-up.svg';
import atom2 from './svg/atom-2.svg';
import banknoteArrowDownDuo from './svg/banknote-arrow-down-duo.svg';
import banknoteArrowDown from './svg/banknote-arrow-down.svg';
import banknoteArrowUp from './svg/banknote-arrow-up.svg';
import barChart4 from './svg/bar-chart-4.svg';
import bellDot from './svg/bell-dot.svg';
import bell from './svg/bell.svg';
import blocks from './svg/blocks.svg';
import bnb from './svg/bnb.svg';
import btc from './svg/btc.svg';
import calendarDays from './svg/calendar-days.svg';
import calendar from './svg/calendar.svg';
import chartArea from './svg/chart-area.svg';
import chartCandlestick from './svg/chart-candlestick.svg';
import chartColumnBig from './svg/chart-column-big.svg';
import chartNoAxesCombined from './svg/chart-no-axes-combined.svg';
import chartPie from './svg/chart-pie.svg';
import chartSpline from './svg/chart-spline.svg';
import checkVerified02 from './svg/check-verified-02.svg';
import check from './svg/check.svg';
import chevronDown from './svg/chevron-down.svg';
import circleAlert from './svg/circle-alert.svg';
import circleCheckBig from './svg/circle-check-big.svg';
import circleCheck from './svg/circle-check.svg';
import circleUser from './svg/circle-user.svg';
import circleX from './svg/circle-x.svg';
import clock from './svg/clock.svg';
import close from './svg/close.svg';
import code2 from './svg/code-2.svg';
import codepen from './svg/codepen.svg';
import coinReturn from './svg/coin-return.svg';
import coins from './svg/coins.svg';
import copy from './svg/copy.svg';
import currency from './svg/currency.svg';
import diamond from './svg/diamond.svg';
import disc2 from './svg/disc-2.svg';
import discord from './svg/discord.svg';
import diskCircle from './svg/disk-circle.svg';
import dollarSign from './svg/dollar-sign.svg';
import dollar from './svg/dollar.svg';
import ellipsisVertical from './svg/ellipsis-vertical.svg';
import eth from './svg/eth.svg';
import eyeOff from './svg/eye-off.svg';
import eye from './svg/eye.svg';
import fileText from './svg/file-text.svg';
import file from './svg/file.svg';
import flame from './svg/flame.svg';
import github from './svg/github.svg';
import globe from './svg/globe.svg';
import google2 from './svg/google-2.svg';
import google from './svg/google.svg';
import handCoins from './svg/hand-coins.svg';
import icoReturn from './svg/ico-return.svg';
import info from './svg/info.svg';
import layersThree1 from './svg/layers-three-1.svg';
import line from './svg/line.svg';
import link3 from './svg/link-3.svg';
import listFilter from './svg/list-filter.svg';
import list from './svg/list.svg';
import lock from './svg/lock.svg';
import logIn from './svg/log-in.svg';
import logOut from './svg/log-out.svg';
import logoIllust from './svg/logo-illust.svg';
import logo from './svg/logo.svg';
import mail from './svg/mail.svg';
import menu from './svg/menu.svg';
import metamask from './svg/metamask.svg';
import microscope from './svg/microscope.svg';
import microsoft from './svg/microsoft.svg';
import minusCircle from './svg/minus-circle.svg';
import moon from './svg/moon.svg';
import penLine from './svg/pen-line.svg';
import pencil from './svg/pencil.svg';
import plusCircle from './svg/plus-circle.svg';
import plus from './svg/plus.svg';
import power from './svg/power.svg';
import raise from './svg/raise.svg';
import rocket from './svg/rocket.svg';
import scrollText from './svg/scroll-text.svg';
import searchX from './svg/search-x.svg';
import search from './svg/search.svg';
import send from './svg/send.svg';
import settings from './svg/settings.svg';
import shieldAlert from './svg/shield-alert.svg';
import shieldTick from './svg/shield-tick.svg';
import shield from './svg/shield.svg';
import solana from './svg/solana.svg';
import sparkles from './svg/sparkles.svg';
import spinner from './svg/spinner.svg';
import squareArrowOutUpRight from './svg/square-arrow-out-up-right.svg';
import squareDashedMousePointer from './svg/square-dashed-mouse-pointer.svg';
import squarePen from './svg/square-pen.svg';
import sun from './svg/sun.svg';
import target from './svg/target.svg';
import telegram2 from './svg/telegram-2.svg';
import telegram from './svg/telegram.svg';
import trash from './svg/trash.svg';
import trendingDown from './svg/trending-down.svg';
import trendingUpDown from './svg/trending-up-down.svg';
import trendingUp from './svg/trending-up.svg';
import triangleAlert from './svg/triangle-alert.svg';
import twitter from './svg/twitter.svg';
import unlink from './svg/unlink.svg';
import usdc from './svg/usdc.svg';
import user from './svg/user.svg';
import users from './svg/users.svg';
import verified from './svg/verified.svg';
import wallet from './svg/wallet.svg';
import window from './svg/window.svg';
import xClose from './svg/x-close.svg';
import x from './svg/x.svg';
import youtube from './svg/youtube.svg';
import circleDollarSign from './svg/circle-dollar-sign.svg';
import cornerRightUp from './svg/corner-right-up.svg';

const IconList = {
  google,
  microsoft,
  github,
  globe,
  file,
  window,
  eyeOff,
  cloud: Cloud,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  sun,
  moon,
  check,
  circleAlert,
  spinner,
  chevronDown,
  close,
  calendar,
  arrowLeft,
  arrowRight,
  logIn,
  logOut,
  logo,
  logoIllust,
  discord,
  twitter,
  youtube,
  arrowUpRight,
  diamond,
  scrollText,
  chartCandlestick,
  blocks,
  currency,
  wallet,
  handCoins,
  banknoteArrowDown,
  copy,
  squareArrowOutUpRight,
  solana,
  usdc,
  btc,
  eth,
  bnb,
  coins,
  flame,
  search,
  searchX,
  squareDashedMousePointer,
  trendingUp,
  trendingDown,
  info,
  clock,
  disc2,
  circleCheckBig,
  arrowRight2,
  arrowDownWideNarrow,
  arrowDownNarrowWide,
  banknoteArrowUp,
  dollarSign,
  user,
  verified,
  shield,
  target,
  raise,
  arrowCircleUp,
  dollar,
  icoReturn,
  eye,
  trendingUpDown,
  chartColumnBig,
  chartPie,
  coinReturn,
  arrowUp,
  telegram,
  users,
  chartArea,
  arrowLeftRight,
  menu,
  rocket,
  ellipsisVertical,
  chartSpline,
  alignCenterHorizontal,
  arrowUpDown,
  mail,
  lock,
  bellDot,
  circleUser,
  xClose,
  shieldAlert,
  unlink,
  penLine,
  google2,
  telegram2,
  bell,
  settings,
  triangleAlert,
  metamask,
  list,
  plus,
  banknoteArrowDownDuo,
  trash,
  pencil,
  arrowRight3,
  power,
  circleCheck,
  circleX,
  squarePen,
  line,
  diskCircle,
  sparkles,
  shieldTick,
  checkVerified02,
  atom2,
  barChart4,
  layersThree1,
  link3,
  minusCircle,
  plusCircle,
  code2,
  codepen,
  send,
  arrowUpRight2,
  calendarDays,
  microscope,
  chartNoAxesCombined,
  listFilter,
  x,
  fileText,
  circleDollarSign,
  cornerRightUp,
};

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface IconProps extends ComponentAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type Icon = ForwardRefExoticComponent<IconProps>;

export const Icons = IconList as Record<keyof typeof IconList, Icon>;
