import { TabView } from "@/components/news-body/tab-view/TabView";
import { TabAll } from "@/components/news-body/tabs/tab-all/TabAll";
import { TabFaves } from "@/components/news-body/tabs/tab-faves/TabFaves";

export function NewsBody() {
  const tabs = [
    {
      label: "All",
      content: <TabAll />,
    },
    {
      label: "My Faves",
      content: <TabFaves />,
    },
  ];
  return <TabView tabs={tabs} />;
}
