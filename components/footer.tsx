"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Officialibn1",
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/isah-muhammad-5046b125a/",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      url: "https://x.com/_lifeofibn",
      icon: Twitter,
    },
    {
      name: "Email",
      url: "mailto:lifeofibn@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="w-full px-6 sm:px-8 py-12 sm:py-16 bg-card border-t border-border backdrop-blur-lg">
      <div className="mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <div className="space-y-8 mb-12 pb-8 border-b border-border">
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-accent transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Developer Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Isah Ibn Muhammad
            </h3>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground">
              Full-Stack Developer
            </h1>
            <p className="text-base text-foreground/70">
              Building digital experiences with clean code and thoughtful
              design. <span className="font-semibold">4+ years</span> of
              professional full-stack development.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <a
              href="#"
              className="text-foreground/70 hover:text-foreground transition-colors text-sm"
            >
              About
            </a>
            <a
              href="#experience"
              className="text-foreground/70 hover:text-foreground transition-colors text-sm"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-foreground/70 hover:text-foreground transition-colors text-sm"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-foreground/70 hover:text-foreground transition-colors text-sm"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="space-y-3 text-center sm:text-left">
          <p className="text-sm text-foreground/60">
            &copy; {currentYear} All rights reserved.
          </p>
          <p className="text-sm text-foreground/60">Developed with ❤️ by Ibn</p>
        </div>
      </div>
    </footer>
  );
}
