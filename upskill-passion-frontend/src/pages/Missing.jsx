import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <section className="p-[15%] text-2xl text-center bg-blue-500 h-screen">
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="flex-grow">
        <Link to="/" className="font-bold underline">
          Visit Our Homepage
        </Link>
      </div>
    </section>
  );
};

export default Missing;
