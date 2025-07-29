// API Simulation for AutoMate Pro
// This file simulates backend API responses for demonstration purposes

class AutoMateAPI {
  constructor() {
    this.data = null;
    this.loadData();
  }

  async loadData() {
    try {
      const response = await fetch("./data.json");
      this.data = await response.json();
    } catch (error) {
      console.error("Error loading data:", error);
      this.data = this.getFallbackData();
    }
  }

  // Simulate automation demo processing
  async processAutomation(input, type) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = this.generateAutomationResult(input, type);
        resolve({
          success: true,
          data: result,
          timestamp: new Date().toISOString(),
          processing_time: Math.random() * 2 + 0.5,
        });
      }, 1500 + Math.random() * 1000);
    });
  }

  generateAutomationResult(input, type) {
    const baseMetrics = {
      input_length: input.length,
      processing_time: (Math.random() * 2 + 0.5).toFixed(2),
      success_rate: (Math.random() * 10 + 90).toFixed(1),
      timestamp: new Date().toLocaleTimeString(),
    };

    switch (type) {
      case "text-process":
        return {
          ...baseMetrics,
          type: "Text Processing",
          word_count: input.split(" ").length,
          sentiment: Math.random() > 0.5 ? "Positive" : "Neutral",
          language: "English",
          keywords: this.extractKeywords(input),
          confidence: (Math.random() * 20 + 80).toFixed(1),
        };

      case "data-analysis":
        return {
          ...baseMetrics,
          type: "Data Analysis",
          data_quality: (Math.random() * 100).toFixed(1),
          anomalies: Math.floor(Math.random() * 5),
          patterns_found: Math.floor(Math.random() * 10 + 5),
          insights_generated: Math.floor(Math.random() * 8 + 3),
        };

      case "workflow":
        return {
          ...baseMetrics,
          type: "Workflow Automation",
          tasks_completed: Math.floor(Math.random() * 15 + 10),
          efficiency_gain: (Math.random() * 40 + 20).toFixed(0),
          time_saved: (Math.random() * 60 + 30).toFixed(0),
          steps_automated: Math.floor(Math.random() * 8 + 5),
        };

      default:
        return baseMetrics;
    }
  }

  extractKeywords(text) {
    const words = text.toLowerCase().split(" ");
    const stopWords = [
      "the",
      "a",
      "an",
      "and",
      "or",
      "but",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "by",
    ];
    const keywords = words
      .filter((word) => word.length > 3 && !stopWords.includes(word))
      .slice(0, 5);
    return keywords.length > 0
      ? keywords
      : ["automation", "process", "efficiency"];
  }

  // Simulate contact form submission
  async submitContact(formData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate validation
        if (!formData.name || !formData.email || !formData.message) {
          resolve({
            success: false,
            error: "Missing required fields",
            timestamp: new Date().toISOString(),
          });
          return;
        }

        // Simulate successful submission
        resolve({
          success: true,
          message: "Contact form submitted successfully",
          ticket_id:
            "AM-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          timestamp: new Date().toISOString(),
          estimated_response: "24 hours",
        });
      }, 1000 + Math.random() * 500);
    });
  }

  // Get service details
  getServiceDetails(serviceId) {
    if (!this.data || !this.data.services) {
      return this.getFallbackServiceData(serviceId);
    }
    return this.data.services[serviceId] || null;
  }

  // Get statistics
  getStats() {
    if (!this.data || !this.data.stats) {
      return {
        clients_served: 500,
        processes_automated: 10000,
        time_saved_hours: 2500000,
        cost_reduction_percent: 65,
      };
    }
    return this.data.stats;
  }

  // Get testimonials
  getTestimonials() {
    if (!this.data || !this.data.testimonials) {
      return this.getFallbackTestimonials();
    }
    return this.data.testimonials;
  }

  // Simulate real-time metrics
  generateLiveMetrics() {
    return {
      active_processes: Math.floor(Math.random() * 50 + 150),
      data_processed_gb: (Math.random() * 100 + 500).toFixed(1),
      uptime_percent: (99.5 + Math.random() * 0.5).toFixed(2),
      response_time_ms: (Math.random() * 50 + 10).toFixed(0),
      active_users: Math.floor(Math.random() * 500 + 1000),
      tasks_completed_today: Math.floor(Math.random() * 1000 + 5000),
    };
  }

  // Fallback data methods
  getFallbackData() {
    return {
      services: {
        process_automation: {
          title: "Process Automation",
          description: "Streamline repetitive tasks and workflows",
        },
      },
      stats: {
        clients_served: 500,
        processes_automated: 10000,
      },
    };
  }

  getFallbackServiceData(serviceId) {
    const services = {
      process: {
        title: "Process Automation",
        description: "Streamline workflows",
      },
      analytics: { title: "Data Analytics", description: "Analyze your data" },
      cloud: {
        title: "Cloud Integration",
        description: "Connect your systems",
      },
    };
    return services[serviceId] || null;
  }

  getFallbackTestimonials() {
    return [
      {
        name: "John Doe",
        company: "Tech Company",
        message: "Great automation solutions!",
        rating: 5,
      },
    ];
  }
}

// Global API instance
window.autoMateAPI = new AutoMateAPI();

// Simulate API endpoints for demonstration
if (typeof module !== "undefined" && module.exports) {
  module.exports = AutoMateAPI;
}
