import { Component, h } from 'hyperapp';

export const FullPageIcon: Component = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M81.3,11.7H18.7V68.3H81.3Zm-4,52.6H22.7V15.7H77.3Z" />
    <path d="M71,21.7H29V38.8H71ZM67,34.8H33V25.7H67Z" />
    <rect x="25.7" y="74.3" width="48.5" height="4" />
    <rect x="35.7" y="84.3" width="28.5" height="4" />
    <rect x="29" y="44.8" width="42.1" height="4" />
    <rect x="29" y="54.8" width="42.1" height="4" />
  </svg>
);

export const VisiblePageIcon: Component = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M81.3,11.7H18.7V68.3H81.3Zm-4,52.6H22.7V15.7H77.3Z" />
    <path d="M71,21.7H29V38.8H71ZM67,34.8H33V25.7H67Z" />
    <rect x="29" y="44.8" width="42.1" height="4" />
    <rect x="29" y="54.8" width="42.1" height="4" />
  </svg>
);

export const SelectionIcon: Component = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1 30 30">
    <g transform="translate(-30 -440)">
      <path d="M53,446H37v-2h-5v5h2v12h-2v5h5v-2h16v2h5v-5h-2v-12h2v-5h-5V446z M33,448v-3h3v3H33z M36,465h-3v-3h3V465z M53,463H37v-2    h-2v-12h2v-2h16v2h2v12h-2V463z M57,462v3h-3v-3H57z M54,445h3v3h-3V445z" />
    </g>
  </svg>
);

export const NewCardIcon: Component = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M50,5C25.147,5,5,25.147,5,50c0,24.852,20.147,45,45,45c24.854,0,45-20.148,45-45C95,25.147,74.854,5,50,5z M73.65,56.148  H56.148l0.002,17.5l-12.3,0.002V56.148h-17.5V43.849h17.5l-0.001-17.5h12.299l0.002,17.5h17.5V56.148z" />
  </svg>
);

export const ExistingCardIcon: Component = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M96.697,88.918L73.602,65.824c11.5-15.293,10.301-37.168-3.609-51.08C62.613,7.367,52.803,3.303,42.369,3.303  S22.125,7.367,14.746,14.744C7.367,22.123,3.303,31.934,3.303,42.369c0,10.434,4.064,20.244,11.443,27.623  s17.189,11.443,27.623,11.443c8.576,0,16.729-2.752,23.461-7.828l23.09,23.09L96.697,88.918z M42.369,70.436  c-7.496,0-14.545-2.92-19.846-8.221c-5.301-5.303-8.221-12.35-8.221-19.846c0-7.498,2.92-14.545,8.221-19.846  s12.35-8.221,19.846-8.221s14.545,2.92,19.846,8.221c10.941,10.941,10.941,28.748,0,39.691  C56.914,67.516,49.865,70.436,42.369,70.436z" />
  </svg>
);
