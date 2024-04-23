import { EasyAntdModalProvider, useEasyAntdModal } from './context';
import DragModal from './drag-modal';
import Drawer from './drawer';
import Modal from './modal';
export { default as CyBar } from './CyBar';
export { default as DiyChart } from './CyBar/DiyChart';
export { default as CyPie } from './CyPie';
export { default as CyPie2d } from './CyPie/CyPie2d';
export { default as CyText } from './CyText';
export { default as TypewriterCY } from './TypewriterCY';

export * from './hooks';
export * from './types';
export * from './util';

export * from './drag-modal';
export * from './drawer';
export * from './modal';

export {
  DragModal,
  Drawer,
  EasyAntdModalProvider,
  Modal,
  // ====== Hooks ======
  useEasyAntdModal,
};

export default Modal;

export * as AntdMobile from './mobile';
export const Antd = {
  Modal,
  Drawer,
};
