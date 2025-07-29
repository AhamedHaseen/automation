// AutoMate Pro - JavaScript with jQuery and Ajax
$(document).ready(function () {
  "use strict";

  // Hide loading spinner after page load
  $(window).on("load", function () {
    setTimeout(function () {
      $("#loading-spinner").addClass("hidden");
    }, 1000);
  });

  // Smooth scrolling for navigation links
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const target = $(this.getAttribute("href"));
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 70,
        },
        1000
      );
    }
  });

  // Navbar background change on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("bg-dark-solid");
    } else {
      $(".navbar").removeClass("bg-dark-solid");
    }
  });

  // Hero Section Button Actions
  $("#get-started-btn").click(function () {
    showNotification(
      "Welcome! Let's get you started with automation.",
      "success"
    );
    $("html, body").animate(
      {
        scrollTop: $("#contact").offset().top - 70,
      },
      1000
    );
  });

  $("#watch-demo-btn").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#demo").offset().top - 70,
      },
      1000
    );
  });

  // Service Learn More Buttons
  $(".learn-more-btn").click(function () {
    const service = $(this).data("service");
    loadServiceDetails(service);
  });

  // Demo Section Functionality
  $("#run-automation").click(function () {
    runAutomationDemo();
  });

  $("#clear-demo").click(function () {
    clearDemo();
  });

  // Contact Form Submission
  $("#contact-form").submit(function (e) {
    e.preventDefault();
    submitContactForm();
  });

  // Animation on scroll
  $(window).scroll(function () {
    $(".solution-item, .service-card").each(function () {
      const elementTop = $(this).offset().top;
      const elementBottom = elementTop + $(this).outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass("animate-fade-in");
      }
    });
  });

  // Functions
  function loadServiceDetails(service) {
    const serviceData = {
      process: {
        title: "Process Automation",
        content: `
                    <h6>Transform Your Business Operations</h6>
                    <p>Our process automation solutions help you streamline repetitive tasks and workflows, reducing manual effort and eliminating human errors.</p>
                    <ul>
                        <li>Workflow Design & Implementation</li>
                        <li>Task Scheduling & Monitoring</li>
                        <li>Integration with Existing Systems</li>
                        <li>Real-time Process Analytics</li>
                        <li>Compliance & Audit Trails</li>
                    </ul>
                    <div class="mt-3">
                        <span class="badge bg-primary me-2">RPA</span>
                        <span class="badge bg-success me-2">Workflow</span>
                        <span class="badge bg-info">Integration</span>
                    </div>
                `,
      },
      analytics: {
        title: "Data Analytics Automation",
        content: `
                    <h6>Unlock the Power of Your Data</h6>
                    <p>Automate your data collection, processing, and analysis to gain actionable insights and make data-driven decisions.</p>
                    <ul>
                        <li>Automated Data Collection</li>
                        <li>Real-time Dashboard Creation</li>
                        <li>Predictive Analytics</li>
                        <li>Custom Report Generation</li>
                        <li>Machine Learning Integration</li>
                    </ul>
                    <div class="mt-3">
                        <span class="badge bg-primary me-2">Machine Learning</span>
                        <span class="badge bg-success me-2">BI Tools</span>
                        <span class="badge bg-info">Dashboards</span>
                    </div>
                `,
      },
      cloud: {
        title: "Cloud Integration Services",
        content: `
                    <h6>Seamless Cloud Automation</h6>
                    <p>Connect and automate your cloud infrastructure with our comprehensive integration services.</p>
                    <ul>
                        <li>Multi-Cloud Management</li>
                        <li>API Integration & Management</li>
                        <li>Cloud Security Automation</li>
                        <li>Disaster Recovery Automation</li>
                        <li>Cost Optimization Tools</li>
                    </ul>
                    <div class="mt-3">
                        <span class="badge bg-primary me-2">AWS</span>
                        <span class="badge bg-success me-2">Azure</span>
                        <span class="badge bg-info me-2">Google Cloud</span>
                        <span class="badge bg-warning">Hybrid</span>
                    </div>
                `,
      },
    };

    const data = serviceData[service];
    $("#serviceModalLabel").text(data.title);
    $("#serviceModalBody").html(data.content);

    // Show modal with animation
    $("#serviceModal").modal("show");
  }

  function runAutomationDemo() {
    const input = $("#demo-input").val();
    const automationType = $("#automation-type").val();

    if (!input.trim()) {
      showNotification("Please enter some data to process.", "warning");
      return;
    }

    // Update status
    updateStatus("processing", "Processing...");

    // Simulate AJAX call to automation service
    $.ajax({
      url: "/api/automation/demo", // This would be your actual API endpoint
      method: "POST",
      data: {
        input: input,
        type: automationType,
      },
      timeout: 5000,
      beforeSend: function () {
        $("#demo-result").addClass("loading");
        $("#run-automation").prop("disabled", true);
      },
    })
      .done(function (response) {
        // Simulate successful response
        displayDemoResult(input, automationType);
        updateStatus("success", "Completed");
        showNotification("Automation completed successfully!", "success");
      })
      .fail(function () {
        // Simulate the automation processing since we don't have a real backend
        setTimeout(() => {
          displayDemoResult(input, automationType);
          updateStatus("success", "Completed");
          showNotification("Automation completed successfully!", "success");
        }, 2000);
      })
      .always(function () {
        $("#demo-result").removeClass("loading");
        $("#run-automation").prop("disabled", false);
      });
  }

  function displayDemoResult(input, type) {
    let result = "";
    const timestamp = new Date().toLocaleTimeString();

    switch (type) {
      case "text-process":
        result = `[${timestamp}] TEXT PROCESSING AUTOMATION
                
Input: "${input}"

Processing Steps:
1. Text normalization...
2. Sentiment analysis...
3. Keyword extraction...
4. Language detection...

Results:
- Character count: ${input.length}
- Word count: ${input.split(" ").length}
- Detected language: English
- Sentiment: ${Math.random() > 0.5 ? "Positive" : "Neutral"}
- Keywords: ${extractKeywords(input)}

Status: ✅ Processing completed successfully`;
        break;

      case "data-analysis":
        result = `[${timestamp}] DATA ANALYSIS AUTOMATION

Input Data: "${input}"

Analysis Pipeline:
1. Data validation...
2. Statistical analysis...
3. Pattern recognition...
4. Trend identification...

Metrics Generated:
- Data quality score: ${(Math.random() * 100).toFixed(1)}%
- Anomalies detected: ${Math.floor(Math.random() * 5)}
- Confidence level: ${(Math.random() * 30 + 70).toFixed(1)}%
- Processing time: ${(Math.random() * 2 + 0.5).toFixed(2)}s

Status: ✅ Analysis completed successfully`;
        break;

      case "workflow":
        result = `[${timestamp}] WORKFLOW AUTOMATION

Workflow Trigger: "${input}"

Automation Sequence:
1. Input validation ✅
2. Process initialization ✅
3. Task distribution ✅
4. Quality control ✅
5. Output generation ✅

Workflow Metrics:
- Tasks completed: ${Math.floor(Math.random() * 10 + 5)}
- Success rate: ${(Math.random() * 10 + 90).toFixed(1)}%
- Processing efficiency: +${(Math.random() * 40 + 20).toFixed(0)}%
- Time saved: ${(Math.random() * 60 + 30).toFixed(0)} minutes

Status: ✅ Workflow executed successfully`;
        break;
    }

    $("#demo-result").html(`<pre class="text-light mb-0">${result}</pre>`);
  }

  function extractKeywords(text) {
    const words = text.toLowerCase().split(" ");
    const commonWords = [
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
    const keywords = words.filter(
      (word) => word.length > 3 && !commonWords.includes(word)
    );
    return keywords.slice(0, 3).join(", ") || "automation, process, efficiency";
  }

  function updateStatus(type, message) {
    const statusBadge = $("#status-indicator");
    statusBadge.removeClass(
      "bg-secondary status-processing status-success status-error"
    );

    switch (type) {
      case "processing":
        statusBadge.addClass("status-processing");
        break;
      case "success":
        statusBadge.addClass("status-success");
        break;
      case "error":
        statusBadge.addClass("status-error");
        break;
      default:
        statusBadge.addClass("bg-secondary");
    }

    statusBadge.text(message);
  }

  function clearDemo() {
    $("#demo-input").val("");
    $("#demo-result").html(
      '<p class="text-light mb-0">Click "Run Automation" to see results...</p>'
    );
    updateStatus("ready", "Ready");
    showNotification("Demo cleared successfully.", "info");
  }

  function submitContactForm() {
    const formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      company: $("#company").val(),
      message: $("#message").val(),
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      showNotification("Please fill in all required fields.", "warning");
      return;
    }

    // Simulate AJAX form submission
    $.ajax({
      url: "/api/contact", // This would be your actual API endpoint
      method: "POST",
      data: formData,
      beforeSend: function () {
        $('button[type="submit"]')
          .prop("disabled", true)
          .html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
      },
    })
      .done(function (response) {
        showNotification(
          "Thank you! Your message has been sent successfully.",
          "success"
        );
        $("#contact-form")[0].reset();
      })
      .fail(function () {
        // Simulate successful submission since we don't have a real backend
        setTimeout(() => {
          showNotification(
            "Thank you! Your message has been sent successfully.",
            "success"
          );
          $("#contact-form")[0].reset();
        }, 1500);
      })
      .always(function () {
        $('button[type="submit"]')
          .prop("disabled", false)
          .html('<i class="fas fa-paper-plane me-2"></i>Send Message');
      });
  }

  function showNotification(message, type) {
    // Create notification element
    const notification = $(`
            <div class="alert alert-${type} alert-dismissible fade show position-fixed" style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);

    // Add to page
    $("body").append(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.alert("close");
    }, 5000);
  }

  // Dynamic content loading with AJAX
  function loadDynamicContent(endpoint, targetElement) {
    $.ajax({
      url: endpoint,
      method: "GET",
      beforeSend: function () {
        $(targetElement).addClass("loading");
      },
    })
      .done(function (data) {
        $(targetElement).html(data);
      })
      .fail(function () {
        $(targetElement).html(
          '<p class="text-muted">Content temporarily unavailable.</p>'
        );
      })
      .always(function () {
        $(targetElement).removeClass("loading");
      });
  }

  // Real-time updates simulation
  function startRealTimeUpdates() {
    setInterval(function () {
      // Simulate real-time data updates
      $(".live-metric").each(function () {
        const currentValue = parseInt($(this).text()) || 0;
        const newValue = currentValue + Math.floor(Math.random() * 10 - 5);
        $(this).text(Math.max(0, newValue));
      });
    }, 5000);
  }

  // Initialize real-time updates
  startRealTimeUpdates();

  // Lazy loading for images
  $("img[data-src]").each(function () {
    const img = $(this);
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const src = img.data("src");
          img.attr("src", src).removeAttr("data-src");
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(this);
  });

  // Advanced form validation
  function validateForm(formSelector) {
    let isValid = true;
    $(formSelector + " [required]").each(function () {
      const field = $(this);
      const value = field.val().trim();

      if (!value) {
        field.addClass("is-invalid");
        isValid = false;
      } else {
        field.removeClass("is-invalid").addClass("is-valid");
      }

      // Email validation
      if (field.attr("type") === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          field.addClass("is-invalid");
          isValid = false;
        }
      }
    });

    return isValid;
  }

  // Add input event listeners for real-time validation
  $("input, textarea").on("input", function () {
    const field = $(this);
    if (field.attr("required")) {
      if (field.val().trim()) {
        field.removeClass("is-invalid").addClass("is-valid");
      } else {
        field.removeClass("is-valid").addClass("is-invalid");
      }
    }
  });

  // Performance monitoring
  const performanceMonitor = {
    init: function () {
      this.startTime = performance.now();
      this.logEvent("Page Load Started");
    },

    logEvent: function (eventName) {
      const currentTime = performance.now();
      const elapsedTime = currentTime - this.startTime;
      console.log(`[Performance] ${eventName}: ${elapsedTime.toFixed(2)}ms`);
    },

    measureFunction: function (fn, name) {
      const start = performance.now();
      const result = fn();
      const end = performance.now();
      this.logEvent(`${name} execution: ${(end - start).toFixed(2)}ms`);
      return result;
    },
  };

  // Initialize performance monitoring
  performanceMonitor.init();

  // Service Worker for offline functionality (if needed)
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful");
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed");
      });
  }

  // Dark mode toggle (bonus feature)
  function toggleDarkMode() {
    $("body").toggleClass("dark-mode");
    const isDark = $("body").hasClass("dark-mode");
    localStorage.setItem("darkMode", isDark);
  }

  // Load dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    $("body").addClass("dark-mode");
  }

  // Analytics tracking (simulated)
  function trackEvent(eventName, eventData) {
    // This would typically send data to your analytics service
    console.log("Analytics Event:", eventName, eventData);

    // Simulate sending to analytics service
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, eventData);
    }
  }

  // Track user interactions
  $("button, .btn, .nav-link").click(function () {
    const element = $(this);
    trackEvent("user_interaction", {
      element_type: element.prop("tagName"),
      element_class: element.attr("class"),
      element_text: element.text().trim(),
    });
  });

  // Final initialization message
  console.log("AutoMate Pro website initialized successfully!");
  performanceMonitor.logEvent("Initialization Complete");
});

// Additional utility functions
window.AutoMatePro = {
  // Utility function to format numbers
  formatNumber: function (num) {
    return new Intl.NumberFormat().format(num);
  },

  // Utility function to format dates
  formatDate: function (date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  },

  // Utility function to generate random ID
  generateId: function () {
    return Math.random().toString(36).substr(2, 9);
  },

  // Utility function to debounce function calls
  debounce: function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
};
