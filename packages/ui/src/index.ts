'use client';

// Foundation
export * from './foundation';

// Layout
export { Flex } from './components/layout/Flex';
export { Box } from './components/layout/Box';
export { Spacing } from './components/layout/Spacing';
export { Grid } from './components/layout/Grid';
export { BottomCTASingle, BottomCTADouble, FixedBottomCTA } from './components/layout/BottomCTA';
export type { BottomCTASingleProps, BottomCTADoubleProps, FixedBottomCTAProps } from './components/layout/BottomCTA';
export { MobileLayout, AppHeader, BottomTabBar, SafeAreaWrapper } from './components/layout/MobileLayout';
export type { MobileLayoutProps, AppHeaderProps, BottomTabBarProps, SafeAreaWrapperProps, TabItem } from './components/layout/MobileLayout';

// General
export { Button } from './components/general/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/general/Button';
export { Input } from './components/general/Input';
export type { InputProps } from './components/general/Input';
export { Select } from './components/general/Select';
export type { SelectProps, SelectOption } from './components/general/Select';
export { Checkbox } from './components/general/Checkbox';
export type { CheckboxProps } from './components/general/Checkbox';
export { Switch } from './components/general/Switch';
export type { SwitchProps } from './components/general/Switch';
export { TextField, SplitTextField, TextArea } from './components/general/TextField';
export type { TextFieldProps, SplitTextFieldProps, TextAreaProps } from './components/general/TextField';
export { IconButton } from './components/general/IconButton';
export type { IconButtonProps, IconButtonVariant } from './components/general/IconButton';
export { Menu } from './components/general/Menu';
export type { MenuTriggerProps, MenuPlacement } from './components/general/Menu';
export { NumericSpinner } from './components/general/NumericSpinner';
export type { NumericSpinnerProps, NumericSpinnerSize } from './components/general/NumericSpinner';
export { ProgressBar } from './components/general/ProgressBar';
export type { ProgressBarProps, ProgressBarSize } from './components/general/ProgressBar';
export { ProgressStepper, ProgressStep } from './components/general/ProgressStepper';
export type { ProgressStepperProps, ProgressStepProps, ProgressStepperVariant } from './components/general/ProgressStepper';
export { Rating } from './components/general/Rating';
export type { RatingProps, RatingSize, RatingVariant } from './components/general/Rating';
export { SearchField } from './components/general/SearchField';
export type { SearchFieldProps } from './components/general/SearchField';
export { SegmentedControl } from './components/general/SegmentedControl';
export type { SegmentedControlProps, SegmentedControlItemProps, SegmentedControlSize, SegmentedControlAlignment } from './components/general/SegmentedControl';
export { Slider, SliderTooltip } from './components/general/Slider';
export type { SliderProps, SliderTooltipProps } from './components/general/Slider';
export { Stepper, StepperRow } from './components/general/Stepper';
export type { StepperProps, StepperRowProps, StepperRowTextsProps, StepperRowNumberIconProps, StepperRowRightArrowProps, StepperRowRightButtonProps, StepperRowAssetFrameProps } from './components/general/Stepper';
export { Tab } from './components/general/Tab';
export type { TabProps, TabItemProps, TabSize } from './components/general/Tab';
export { TableRow } from './components/general/TableRow';
export type { TableRowProps, TableRowAlign } from './components/general/TableRow';
export { ListRow } from './components/general/ListRow';
export type { ListRowProps } from './components/general/ListRow';
export { SmartImage } from './components/general/Image';
export type { SmartImageProps, ImageSource } from './components/general/Image';

// Feedback
export { Skeleton } from './components/feedback/Skeleton';
export { ToastContainer, ToastProvider, useToast } from './components/feedback/Toast';
export type { ToastItem, ToastType } from './components/feedback/Toast';
export { Modal } from './components/feedback/Modal';
export type { ModalProps } from './components/feedback/Modal';
export { Drawer } from './components/feedback/Drawer';
export type { DrawerProps } from './components/feedback/Drawer';
export { AlertDialog, ConfirmDialog } from './components/feedback/Dialog';
export type { AlertDialogProps, ConfirmDialogProps } from './components/feedback/Dialog';

// Hooks
export { useModal } from './hooks';

// Icons
export * from './icons';
