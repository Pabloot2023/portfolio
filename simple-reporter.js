// simple-reporter.js
class SimpleReporter {
  onTestEnd(test, result) {
    const status = result.status;
    const icon = status === 'passed' ? '✅' :
                 status === 'failed' ? '❌' :
                 status === 'skipped' ? '⏭️' :
                 '❓';

    console.log(`Test: ${test.title} - status: ${status} ${icon}`);
  }
}

module.exports = SimpleReporter; 