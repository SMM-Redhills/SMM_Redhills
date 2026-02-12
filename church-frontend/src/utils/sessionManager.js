/**
 * Session Manager for Admin Panel
 * Handles session timeout warnings and automatic logout
 */

class SessionManager {
  constructor(options = {}) {
    this.timeout = options.timeout || 3600000; // 1 hour in milliseconds
    this.warningTime = options.warningTime || 300000; // 5 minutes before timeout
    this.checkInterval = options.checkInterval || 30000; // Check every 30 seconds
    this.warningShown = false;
    this.onTimeout = options.onTimeout || this.handleTimeout;
    this.onWarning = options.onWarning || this.handleWarning;
    this.onExtend = options.onExtend || this.handleExtend;
    
    this.startMonitoring();
  }

  startMonitoring() {
    this.interval = setInterval(() => {
      this.checkSession();
    }, this.checkInterval);
  }

  stopMonitoring() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  async checkSession() {
    try {
      // Check session status via API
      const response = await fetch('/api/admin/session-status/', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (response.status === 401) {
        this.handleTimeout();
        return;
      }

      if (response.ok) {
        const data = await response.json();
        const remainingTime = data.session_remaining * 1000; // Convert to milliseconds
        
        if (remainingTime <= this.warningTime && !this.warningShown) {
          this.showWarning(remainingTime);
        } else if (remainingTime > this.warningTime) {
          this.hideWarning();
        }
      }
    } catch (error) {
      console.error('Session check failed:', error);
    }
  }

  showWarning(remainingTime) {
    this.warningShown = true;
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    
    // Create warning modal
    const modal = document.createElement('div');
    modal.id = 'session-warning-modal';
    modal.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      ">
        <div style="
          background: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        ">
          <h3 style="color: #dc2626; margin-bottom: 1rem;">Session Timeout Warning</h3>
          <p style="margin-bottom: 1.5rem;">
            Your session will expire in <strong>${minutes}:${seconds.toString().padStart(2, '0')}</strong>. 
            Do you want to extend your session?
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <button id="extend-session" style="
              background: #059669;
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 600;
            ">
              Extend Session
            </button>
            <button id="logout-now" style="
              background: #dc2626;
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 600;
            ">
              Logout Now
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    document.getElementById('extend-session').addEventListener('click', () => {
      this.extendSession();
    });

    document.getElementById('logout-now').addEventListener('click', () => {
      this.logout();
    });

    // Auto-update countdown
    this.countdownInterval = setInterval(() => {
      remainingTime -= 1000;
      if (remainingTime <= 0) {
        this.handleTimeout();
      } else {
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        const timeElement = modal.querySelector('strong');
        if (timeElement) {
          timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
      }
    }, 1000);

    this.onWarning(remainingTime);
  }

  hideWarning() {
    this.warningShown = false;
    const modal = document.getElementById('session-warning-modal');
    if (modal) {
      modal.remove();
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  async extendSession() {
    try {
      const response = await fetch('/api/admin/extend-session/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        this.hideWarning();
        this.onExtend();
      } else {
        this.handleTimeout();
      }
    } catch (error) {
      console.error('Failed to extend session:', error);
      this.handleTimeout();
    }
  }

  logout() {
    window.location.href = '/admin/logout/';
  }

  handleTimeout() {
    this.stopMonitoring();
    this.hideWarning();
    alert('Your session has expired. You will be redirected to the login page.');
    window.location.href = '/admin/login/';
    this.onTimeout();
  }

  handleWarning(remainingTime) {
    console.log(`Session warning: ${remainingTime}ms remaining`);
  }

  handleExtend() {
    console.log('Session extended successfully');
  }

  // Method to manually reset session monitoring
  reset() {
    this.hideWarning();
    this.startMonitoring();
  }
}

// Export for use in components
export default SessionManager;

// Auto-initialize for admin pages
if (window.location.pathname.startsWith('/admin')) {
  window.sessionManager = new SessionManager({
    timeout: 3600000, // 1 hour
    warningTime: 300000, // 5 minutes
    onTimeout: () => {
      console.log('Session timed out');
    },
    onWarning: (remainingTime) => {
      console.log('Session warning triggered');
    },
    onExtend: () => {
      console.log('Session extended');
    }
  });
}
