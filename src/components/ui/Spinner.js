const Spinner = () => {
  return (
    <div className="flex flex-row">
      <p>L</p>
      <div className="w-full mt-12">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin mt-5 border-blue-500 mx-auto "></div>
      </div>
      <p>ading</p>
    </div>
  );
};

export default Spinner;
