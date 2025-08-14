// app/about/page.jsx
import Image from "next/image";
import TeamCard from "@/Components/TeamCard";

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Empowering creators with innovative tools to share their voice with
            the world.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Mission Section */}
      <section className="py-16  sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              At WordWave, we believe everyone has a story worth telling. Our
              mission is to provide a platform that makes content creation
              seamless, enjoyable, and accessible to all.
            </p>
            <p className="text-lg text-gray-700">
              Founded in 2023, we've grown from a small team of writers to a
              diverse community of creators, developers, and dreamers.
            </p>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/Blogging-in-Digital-Marketing.jpg"
              alt="Team working together"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-pink-600">10K+</p>
              <p className="mt-2 text-gray-600">Active Users</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-pink-600">500+</p>
              <p className="mt-2 text-gray-600">Daily Posts</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-pink-600">50+</p>
              <p className="mt-2 text-gray-600">Countries</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-pink-600">24/7</p>
              <p className="mt-2 text-gray-600">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Meet Our Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <TeamCard
            name="Alex Johnson"
            role="Founder & CEO"
            image="/Team-memeber-01.png"
            social={{ twitter: "#", linkedin: "#" }}
          />
          <TeamCard
            name="Maria Garcia"
            role="Lead Developer"
            image="/222.jpg"
            social={{ twitter: "#", linkedin: "#" }}
          />
          <TeamCard
            name="Sam Wilson"
            role="Content Strategist"
            image="/team_member_3.jpg"
            social={{ twitter: "#", linkedin: "#" }}
          />
          <TeamCard
            name="Taylor Chen"
            role="UX Designer"
            image="/team_member_4.jpg"
            social={{ twitter: "#", linkedin: "#" }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to join our community?
          </h2>
          <p className="text-xl mb-8">
            Start creating and sharing your stories with the world today.
          </p>
          <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
