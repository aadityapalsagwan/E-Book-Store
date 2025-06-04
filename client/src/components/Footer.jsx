import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';




export default function Footer() {

  const developers = [
    {
      name: 'Rohit Singh',
      handle: 'rohitsinghcodes',
      handles: 'rohitsinghcode',
      socials: {
        github: 'https://github.com/rohitsinghcodes',
        twitter: 'https://twitter.com/rohitsinghcodes',
        linkedin: 'https://linkedin.com/in/rohitsinghcodes',
        instagram: 'https://instagram.com/rohitsinghcodes',
        fb: 'https://facebook.com/rohitsinghcodes',
      },
    },
    {
      name: 'Aaditya Palsagwan',
      handle: 'aadityapalsagwan',
      handles: 'c.r.e.a.t.o.r.s.s',
      socials: {
        github: 'https://github.com/aadityapalsagwan',
        twitter: 'https://twitter.com/aadityapalsagwan',
        linkedin: 'https://linkedin.com/in/aadityapalsagwan',
        instagram: 'https://instagram.com/aadityapalsagwan',
        fb: 'https://facebook.com/aadityapalsagwan',
      },
    },
  ];

  return (
    <footer className="bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-950 text-gray-400 px-10 py-14 sm:py-20 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14">
        {/* About */}
        <div>
          <h3 className="text-3xl font-extrabold text-white mb-6 tracking-widest drop-shadow-lg">
            BookStore
          </h3>
          <p className="text-base leading-relaxed text-gray-400 max-w-[320px]">
            Discover your next favorite book, effortlessly. Curated selections and exclusive deals await you.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick Links">
          <h4 className="text-xl font-semibold text-white mb-6 tracking-wide">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            {["Profile", "Cart", "Orders"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link.toLowerCase()}`}
                  className="relative group inline-block transition-colors duration-300 text-gray-400 hover:text-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  {link}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"
                  ></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resources */}
        <nav aria-label="Resources">
          <h4 className="text-xl font-semibold text-white mb-6 tracking-wide">Resources</h4>
          <ul className="space-y-4 text-sm max-w-[220px]">
            {["About", "FAQs", "Terms & Conditions", "Privacy Policy", "Support"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="relative group inline-block transition-colors duration-300 text-gray-400 hover:text-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  {item}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"
                  ></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        {/* <div>
          <h4 className="text-xl font-semibold text-white mb-6 tracking-wide">Social Links</h4>
          <div className="flex mt-8 space-x-8 text-indigo-400 text-3xl">
            {[{
              Icon: FaFacebookF,
              label: 'Facebook',
              href: 'https://www.facebook.com/aadityapalsagwan/',
              hoverColor: 'hover:text-indigo-600',
            }, {
              Icon: FaInstagram,
              label: 'Instagram',
              href: 'https://www.instagram.com/aadityapalsagwan/',
              hoverColor: 'hover:text-pink-500',
            }, {
              Icon: FaTwitter,
              label: 'Twitter',
              href: 'https://www.x.com/adityapalsagwan/',
              hoverColor: 'hover:text-sky-400',
            }, {
              Icon: FaLinkedin,
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/aadityapalsagwan/',
              hoverColor: 'hover:text-blue-600',
            }].map(({ Icon, label, href, hoverColor }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`transition-colors duration-300 ${hoverColor} focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div> */}

        {/* Developers */}
<div>
  <h4 className="text-lg font-semibold text-white mb-4">👨‍💻 Developers</h4>
  <div className="space-y-6">
    {developers.map((dev) => (
      <div
        key={dev.handle}
        className="bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="mb-2">
          <p className="text-white text-sm font-semibold">{dev.name}</p>
          <p className="text-gray-400 text-xs">@{dev.handle}</p>
          <p className="text-gray-400 text-xs">@{dev.handles}</p>
        </div>
        <div className="flex gap-4 text-xl mt-2">
          {/* GitHub */}
          <a
            href={dev.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-700 hover:bg-black text-gray-400 hover:text-white transition duration-300"
          >
            <FaGithub />
          </a>

          {/* LinkedIn */}
          <a
            href={dev.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 text-gray-400 hover:text-white transition duration-300"
          >
            <FaLinkedin />
          </a>

          {/* Twitter */}
          <a
            href={dev.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-700 hover:bg-sky-500 text-gray-400 hover:text-white transition duration-300"
          >
            <FaTwitter />
          </a>

          {/* Instagram */}
          <a
            href={dev.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-700 hover:bg-pink-500 text-gray-400 hover:text-white transition duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href={dev.socials.fb}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-700 hover:bg-blue-500 text-gray-400 hover:text-white transition duration-300"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>
    ))}
  </div>
</div>


      </div>

      {/* Bottom Credits Section */}
      <div className="mt-20 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs sm:text-sm font-light tracking-wider select-text space-y-2">
        <p>© {new Date().getFullYear()} e-BookStore. All rights reserved.</p>
        <p>
          Designed & Developed by{' '}
          <a
            href="https://www.linkedin.com/in/aadityapalsagwan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-500 transition-colors"
          >
            Aaditya Pal
          </a>
        </p>
        <p className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
          In Collaboration With
          {/* <a
            href="https://www.instagram.com/parthbiswas.official/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-pink-500 transition-colors font-medium"
          >
            Parth Biswas
          </a>
          & */}
          <a
            href="https://www.linkedin.com/in/rohitsinghcodes/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-500 transition-colors font-medium"
          >
            Rohit Kumar
          </a>
        </p>
      </div>
    </footer>
  );
}
