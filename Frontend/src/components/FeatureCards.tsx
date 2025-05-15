import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="bg-zinc-900 shadow-lg  p-6  hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,0.5)] transition-shadow duration-300">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-white mt-2">{description}</p>
    </div>
  );
};

interface FeatureCardsProps {
  features: { title: string; description: string }[];
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ features }) => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 ">
      {features.map((feature, index) => (   
        <FeatureCard key={index} title={feature.title} description={feature.description} />
      ))}
    </div>
  );
};

export default FeatureCards;
