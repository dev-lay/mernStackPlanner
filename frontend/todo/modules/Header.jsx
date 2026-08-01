import { FaListCheck } from "react-icons/fa6";
export default function Header() {
  return (
    <div
      className={
        "flex justify-between  rounded-md px-4 py-1.5 border-none items-center navbar bg-primary text-primary-content"
      }
    >
      <span className={"mr-5"}>
        <h1 className={"text-2xl font-medium"}>Codiarc Planner</h1>
        <h2 className={"text-sm  "}>
          Use this app to remember whatever you want to do
        </h2>
      </span>
      <FaListCheck className={"text-2xl cursor-pointer"} />
    </div>
  );
}
