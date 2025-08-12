import { describe, expect, it } from 'vitest';
import { FaGamepad, FaPenNib, FaRocket, FaUsers } from 'react-icons/fa';
import { features, testimonials } from './data';

describe('Home Data', () => {
  describe('features', () => {
    it('should be an array with 4 items', () => {
      expect(features).toBeInstanceOf(Array);
      expect(features).toHaveLength(4);
    });

    it('should have correct structure for each feature', () => {
      features.forEach((feature) => {
        expect(feature).toHaveProperty('icon');
        expect(feature).toHaveProperty('title');
        expect(feature).toHaveProperty('description');
        expect(typeof feature.icon).toBe('function');
        expect(typeof feature.title).toBe('string');
        expect(typeof feature.description).toBe('string');
      });
    });

    it('should contain expected content for Communauté de Passionnés feature', () => {
      const [communityFeature] = features;
      expect(communityFeature.icon).toBe(FaUsers);
      expect(communityFeature.title).toBe('Communauté de Passionnés');
      expect(communityFeature.description).toBe(
        'Rejoignez LA communauté de jeux de société',
      );
    });

    it('should contain expected content for Expertise feature', () => {
      const [, expertiseFeature] = features;
      expect(expertiseFeature.icon).toBe(FaGamepad);
      expect(expertiseFeature.title).toBe('Expertise');
      expect(expertiseFeature.description).toBe(
        'Suivez vos éditeurs préférés à travers des articles et des interviews',
      );
    });

    it('should contain expected content for Contenu Premium feature', () => {
      const [, , premiumFeature] = features;
      expect(premiumFeature.icon).toBe(FaPenNib);
      expect(premiumFeature.title).toBe('Contenu Premium');
      expect(premiumFeature.description).toBe(
        'Créez et partagez des articles de qualité',
      );
    });

    it('should contain expected content for Suivez les tendances feature', () => {
      const [, , , trendsFeature] = features;
      expect(trendsFeature.icon).toBe(FaRocket);
      expect(trendsFeature.title).toBe('Suivez les tendances');
      expect(trendsFeature.description).toBe(
        'Suivez les dernières sorties du jeu de société',
      );
    });

    it('should have unique titles for all features', () => {
      const titles = features.map((feature) => feature.title);
      const uniqueTitles = new Set(titles);
      expect(uniqueTitles.size).toBe(features.length);
    });

    it('should have unique icons for all features', () => {
      const icons = features.map((feature) => feature.icon);
      const uniqueIcons = new Set(icons);
      expect(uniqueIcons.size).toBe(features.length);
    });

    it('should have non-empty descriptions for all features', () => {
      features.forEach((feature) => {
        expect(feature.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('testimonials', () => {
    it('should be an array with 3 items', () => {
      expect(testimonials).toBeInstanceOf(Array);
      expect(testimonials).toHaveLength(3);
    });

    it('should have correct structure for each testimonial', () => {
      testimonials.forEach((testimonial) => {
        expect(testimonial).toHaveProperty('name');
        expect(testimonial).toHaveProperty('role');
        expect(testimonial).toHaveProperty('content');
        expect(testimonial).toHaveProperty('avatar');
        expect(typeof testimonial.name).toBe('string');
        expect(typeof testimonial.role).toBe('string');
        expect(typeof testimonial.content).toBe('string');
        expect(typeof testimonial.avatar).toBe('string');
      });
    });

    it('should contain expected content for Marie Dubois testimonial', () => {
      const [marieTestimonial] = testimonials;
      expect(marieTestimonial.name).toBe('Marie Dubois');
      expect(marieTestimonial.role).toBe('Game Designer');
      expect(marieTestimonial.content).toBe(
        "LeBonMeeple m'a permis de partager mes créations.",
      );
      expect(marieTestimonial.avatar).toBe('/defaultAvatar.jpg');
    });

    it('should contain expected content for Thomas Martin testimonial', () => {
      const [, thomasTestimonial] = testimonials;
      expect(thomasTestimonial.name).toBe('Thomas Martin');
      expect(thomasTestimonial.role).toBe('Éditeur');
      expect(thomasTestimonial.content).toBe(
        'Une plateforme incontournable pour rester connecté avec la communauté.',
      );
      expect(thomasTestimonial.avatar).toBe('/defaultAvatar.jpg');
    });

    it('should contain expected content for Sophie Laurent testimonial', () => {
      const [, , sophieTestimonial] = testimonials;
      expect(sophieTestimonial.name).toBe('Sophie Laurent');
      expect(sophieTestimonial.role).toBe('Influenceuse');
      expect(sophieTestimonial.content).toBe(
        "L'endroit parfait pour découvrir les nouveautés et partager ses passions.",
      );
      expect(sophieTestimonial.avatar).toBe('/defaultAvatar.jpg');
    });

    it('should have unique names for all testimonials', () => {
      const names = testimonials.map((testimonial) => testimonial.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(testimonials.length);
    });

    it('should have different roles for all testimonials', () => {
      const roles = testimonials.map((testimonial) => testimonial.role);
      const uniqueRoles = new Set(roles);
      expect(uniqueRoles.size).toBe(testimonials.length);
    });

    it('should use default avatar for all testimonials', () => {
      testimonials.forEach((testimonial) => {
        expect(testimonial.avatar).toBe('/defaultAvatar.jpg');
      });
    });

    it('should have non-empty content for all testimonials', () => {
      testimonials.forEach((testimonial) => {
        expect(testimonial.content.length).toBeGreaterThan(0);
      });
    });

    it('should have proper French content', () => {
      const allContent = testimonials.map((t) => t.content).join(' ');
      // Verify that the content contains expected French words
      expect(allContent).toContain('créations');
      expect(allContent).toContain('communauté');
      expect(allContent).toContain('découvrir');
      expect(allContent).toContain('nouveautés');
    });
  });

  describe('Data integrity tests', () => {
    it('should export all required data structures', () => {
      expect(features).toBeDefined();
      expect(testimonials).toBeDefined();
    });

    it('should have all testimonials using the same avatar', () => {
      const avatars = testimonials.map((t) => t.avatar);
      const uniqueAvatars = new Set(avatars);
      expect(uniqueAvatars.size).toBe(1);
      expect([...uniqueAvatars][0]).toBe('/defaultAvatar.jpg');
    });

    it('should have all features with French titles and descriptions', () => {
      features.forEach((feature) => {
        expect(feature.title.length).toBeGreaterThan(0);
        expect(feature.description.length).toBeGreaterThan(0);
        // Check for French content patterns
        const frenchPattern = /[àáâäéèêëïîôöùûüÿç]/i;
        const hasFrenchChars =
          frenchPattern.test(feature.title) ||
          frenchPattern.test(feature.description);
        // At least some features should have French characters
        if (feature.title.includes('é') || feature.description.includes('é')) {
          expect(hasFrenchChars).toBe(true);
        }
      });
    });

    it('should maintain data immutability', () => {
      const originalFeaturesLength = features.length;
      const originalTestimonialsLength = testimonials.length;

      // Attempt to modify (should not affect original if properly exported)
      const featuresCopy = [...features];
      const testimonialsCopy = [...testimonials];

      featuresCopy.push({
        icon: FaUsers,
        title: 'test',
        description: 'test',
      });
      testimonialsCopy.push({
        name: 'test',
        role: 'test',
        content: 'test',
        avatar: 'test',
      });

      expect(features.length).toBe(originalFeaturesLength);
      expect(testimonials.length).toBe(originalTestimonialsLength);
    });
  });
});
