const projectTitle = "Maktaba";

const data = [
  {
    id: "1",
    label: "قصيدة تائية/ ايا سائلا لي عن سواك وحكمه وما فيه من احكام فقه وحكمة",
    provider: "Northwestern",
    status: false,
  },

  ...Array.from({ length: 29 }, (_, i) => ({
    id: (i + 4).toString(),
    label: `Item ${i + 4}`,
    provider: Math.random() > 0.5 ? "Northwestern" : "Illinois",
    status: Math.random() > 0.5,
  })),
];

export { data, projectTitle };
