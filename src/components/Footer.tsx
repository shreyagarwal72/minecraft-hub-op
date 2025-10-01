import { Button } from "@/components/ui/button";
import { Github, Twitter, MessageCircle, Youtube, Mail } from "lucide-react";
import minecraftLogo from "@/assets/minecraft-logo.png";

const Footer = () => {
  const footerLinks = {
    content: [
      { name: "Worlds", href: "/worlds" },
      { name: "Addons", href: "/addons" },
      { name: "Shaders", href: "/shaders" },
      { name: "Downloads", href: "/downloads" },
    ],
  };

  const contactLinks = [
    { 
      name: "Email", 
      icon: Mail, 
      href: "mailto:sanjayvansu1973@gmail.com",
      label: "sanjayvansu1973@gmail.com"
    },
    { 
      name: "GitHub", 
      icon: Github, 
      href: "https://github.com/shreyagarwal72",
      label: "shreyagarwal72"
    },
  ];

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={minecraftLogo} alt="Minecraft Java Hub" className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">Minecraft Java Hub</span>
                <span className="text-sm text-muted-foreground">Professional Gaming</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The ultimate destination for Minecraft Java Edition content. 
              Download worlds, addons, shaders, and join our thriving community.
            </p>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Content</h3>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              {contactLinks.map((contact) => {
                const Icon = contact.icon;
                return (
                  <div key={contact.name} className="flex flex-col space-y-1">
                    <Button
                      variant="outline"
                      className="justify-start border-border hover:border-primary hover:text-primary"
                      asChild
                    >
                      <a href={contact.href} className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{contact.label}</span>
                      </a>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <div>
            © 2025 Nextup Studio
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;