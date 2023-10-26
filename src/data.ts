import collection from "./collection";

const projectTitle = "Maktaba";

const data = collection.items.map((item) => {
  return {
    id: item.id,
    label: item.label.none[0],
    thumbnail: item.thumbnail[0].id,
    provider: "Northwestern",
    status: false,
  };
});

export { data, projectTitle };
