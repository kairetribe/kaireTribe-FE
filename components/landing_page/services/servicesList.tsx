import { SERVICES } from "./servicesContent";
import { ServiceCard } from "./serviceCard";

export function ServicesList() {
  return (
    <div id="services">
      {SERVICES.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}
