class Constants {
    constructor() {
        // URLS
        this.BASE_URL = 'http://pulzar.kuasard.com:31414'
        this.ADMIN = this.BASE_URL + '/admin'
        this.EXTENSION = this.BASE_URL + '/extension'
        this.SCHEDULED_JOBS = this.ADMIN + '/scheduled_jobs';
        this.JOBS = this.ADMIN + '/all_jobs?limit=100';
        this.JOB_DETAILS = this.ADMIN + '/jobs';
        this.NETWORK = this.ADMIN + '/network';
        this.SEARCH_DB = this.EXTENSION + '/search/';
        this.JOB_CATALOG = this.ADMIN + '/job_catalog';
        this.JOB_LAUNCHER = this.BASE_URL + '/launch_job/';
    }
}

export default Constants;