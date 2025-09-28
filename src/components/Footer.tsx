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
    community: [
      { name: "Discord Server", href: "#" },
      { name: "Forums", href: "#" },
      { name: "Tutorials", href: "#" },
      { name: "Submit Content", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Installation Guide", href: "#" },
      { name: "Bug Reports", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Discord", icon: MessageCircle, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
  ];

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className="border-border hover:border-primary hover:text-primary"
                    asChild
                  >
                    <a href={social.href} aria-label={social.name}>
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
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

          {/* Community */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
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

          {/* Support */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
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
        </div>

        {/* Newsletter */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-foreground font-semibold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground">Get notified about new content and updates</p>
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <div>
            © 2024 Minecraft Java Hub. Not affiliated with Mojang Studios or Microsoft.
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