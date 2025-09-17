import { CircleLoader } from "react-spinners";

const defaultColor = "#F9F9F9";

interface LoaderProps {
  color?: string;
}

const Loader = ({ color = defaultColor }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center">
      <CircleLoader size={80} color={color} />
    </div>
  );
};

export default Loader;
