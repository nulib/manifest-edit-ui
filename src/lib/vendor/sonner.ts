import { ExternalToast } from "sonner";

export const toastOptions = {
  unstyled: true,
  classNames: {
    toast:
      "toastCallout rt-CalloutRoot rt-r-size-3 rt-variant-soft rt-Flex rt-r-display-flex",
    title: "rt-Text rt-CalloutText rt-r-size-3 rt-r-weight-bold",
    description:
      "rt-Text rt-CalloutText rt-high-contrast  rt-r-size-2 rt-r-weight-light",
    error: "toastError",
  },
};

export const toastDefaults: ExternalToast = {
  duration: 5000,
  position: "bottom-left",
};
