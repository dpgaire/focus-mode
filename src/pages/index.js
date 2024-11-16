import {
  AddTask,
  Button,
  CurrentTask,
  Footer,
  Header,
  Info,
  Records,
} from "@/components";

export default function Home() {
  return (
    <div>
      <Info />
      <CurrentTask />
      <AddTask />
      <Records />
    </div>
  );
}
