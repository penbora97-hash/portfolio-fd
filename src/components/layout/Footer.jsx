export default function Footer({ name }) {
  return (
    <footer className="bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500 transition-colors duration-500">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="text-black dark:text-white font-semibold">
          {name || "Pen Bora"}
        </span>
        . All rights reserved.
      </p>
     
    </footer>
  );
}
