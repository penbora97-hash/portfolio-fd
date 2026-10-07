import { useEffect, useState } from "react";
import {
  getProfile,
  getProjects,
  getSkills,
  getExperiences,
  getEducation,
  getCertificates,
  getLearnings, // ✅ បន្ថែម
} from "../services/portfolioService";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";
import Certificates from "../components/sections/Certificates";
import Learning from "../components/sections/Learning";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      getProfile(),
      getProjects(),
      getSkills(),
      getExperiences(),
      getEducation(),
      getCertificates(),
      getLearnings(), // ✅ បន្ថែម
    ])
      .then(
        ([
          owner,
          projects,
          skills,
          experiences,
          education,
          certificates,
          learnings, // ✅ បន្ថែម
        ]) =>
          setData({
            owner,
            projects: projects || [],
            skills: skills || [],
            experiences: experiences || [],
            education: education || [],
            certificates: certificates || [],
            learnings: learnings || [], // ✅ បន្ថែម
          }),
      )
      .catch(() => setError(true));
  }, []);

  const wrapperClass = "bg-[#0a0a0a] min-h-screen text-white";

  // Loading State
  if (!data && !error) {
    return (
      <div className={`${wrapperClass} flex items-center justify-center`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-800 border-t-[#f59e0b] rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Loading Portfolio...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className={`${wrapperClass} flex items-center justify-center px-4`}>
        <div className="max-w-md text-center space-y-4 border border-red-500/30 bg-red-500/10 rounded-2xl p-10">
          <h2 className="text-2xl font-serif font-bold text-red-400">
            Connection Error
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Cannot connect to the API. Please make sure your Laravel backend is
            running on the correct port.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-[#f59e0b] px-6 py-2.5 text-sm font-semibold text-black hover:bg-[#fbbf24] transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const {
    owner,
    projects,
    skills,
    experiences,
    education,
    certificates,
    learnings,
  } = data;

  return (
    <div id="top" className={wrapperClass}>
      <Navbar name={owner?.name || "Pen Bora"} />
      <main>
        <Hero owner={owner} projects={projects} skills={skills} />
        <About owner={owner} />
        <Skills skills={skills} />
        <Learning learnings={learnings} /> {/* ✅ បញ្ជូន Props */}
        <Projects projects={projects} />
        <Experience experiences={experiences} education={education} />
        <Certificates certificates={certificates} />
        <Contact socialLinks={owner?.social_links} owner={owner} />
      </main>
      <Footer name={owner?.name || "Pen Bora"} />
    </div>
  );
}
