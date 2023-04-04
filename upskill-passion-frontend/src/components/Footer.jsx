import { socialMedia } from "../constants";

const Footer = () => {
  const content = (
    <div className="w-full bg-[#3b5998] flex justify-between items-center md:flex-row flex-col py-6 px-3 border-t-[1px] border-t-[#3f3e45]">
      <p className="font-poppins font-normal text-[18px] text-center leading-[27px] text-white">
        2023 UpSkill Passion. All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
          />
        ))}
      </div>
    </div>
  );

  return content;
};

export default Footer;
