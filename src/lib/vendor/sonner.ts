import { ExternalToast } from "sonner";

export const toastOptions = {
  unstyled: true,
  classNames: {
    toast: "rt-CalloutRoot rt-r-size-3 rt-variant-soft",
    title: "rt-Text rt-CalloutText rt-r-size-3 rt-r-weight-bold",
    description:
      "rt-Text rt-CalloutText rt-high-contrast  rt-r-size-2 rt-r-weight-light",
  },
};

export const toastDefaults: ExternalToast = {
  duration: 7000,
  position: "bottom-left",
};
