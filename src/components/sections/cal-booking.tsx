import { Section } from "@/components/section";

export function CalBooking() {
  return (
    <Section>
      <div className="container mx-auto px-4 mt-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
            Put Your Retrieval on Autopilot
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Book a 30-minute consultation to discuss how we can help transform your development workflow
          </p>
        </div>
        <div className="flex justify-center">
          <iframe
            src="https://cal.com/uttaran-nayak-alchemyst/30min?theme=light&hideEventTypeDetails=false&hideLandingPageDetails=false"
            style={{ width: "100%", height: "700px", border: "none" }}
            allowFullScreen
            className="max-w-4xl rounded-xl shadow-2xl bg-gray-700"
          />
        </div>
      </div>
    </Section>
  );
} 