class Constants {
    constructor() {
        // URLS
        this.BASE_URL = 'http://localhost:31414'
        this.ADMIN = this.BASE_URL + '/admin'
        this.EXTENSION = this.BASE_URL + '/extension'
        this.SCHEDULED_JOBS = this.ADMIN + '/scheduled_jobs';
        this.NETWORK = this.ADMIN + '/network';
        this.SEARCH_DB = this.EXTENSION + '/search/';
        this.JOB_CATALOG = this.ADMIN + '/job_catalog';
        this.JOB_LAUNCHER = this.BASE_URL + '/launch_job/';
    }
}

export default Constants;