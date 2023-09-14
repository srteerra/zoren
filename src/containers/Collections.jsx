import { CollectionItem } from "@/components/CollectionItem";

const Collections = () => {
  const collections = [
    {
      title: "Dinner",
      icon: 0,
    },
    {
      title: "Ana's party",
      icon: 1,
    },
  ];

  const arrayList = collections.map((collection) => (
    <CollectionItem
      key={collection.title}
      title={collection.title}
      icon={collection.icon}
    />
  ));

  return arrayList;
};

export { Collections };
