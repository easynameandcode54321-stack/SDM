import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTurnoverRate,
  filterResources,
  HR_RESOURCES,
  HR_QUIZ_QUESTIONS,
  LIFECYCLE_STAGES
} from './hr-calculations';

test('calculateTurnoverRate calculates low turnover correctly (<=10%)', () => {
  const result = calculateTurnoverRate(5, 100);
  assert.equal(result.rate, 5.0);
  assert.equal(result.status, 'low');
  assert.match(result.label, /Rendah/i);
});

test('calculateTurnoverRate calculates moderate turnover correctly (10-15%)', () => {
  const result = calculateTurnoverRate(12, 100);
  assert.equal(result.rate, 12.0);
  assert.equal(result.status, 'moderate');
  assert.match(result.label, /Sedang/i);
});

test('calculateTurnoverRate calculates high turnover correctly (>15%)', () => {
  const result = calculateTurnoverRate(25, 100);
  assert.equal(result.rate, 25.0);
  assert.equal(result.status, 'high');
  assert.match(result.label, /Tinggi/i);
});

test('calculateTurnoverRate handles zero or invalid total employees safely', () => {
  const zeroResult = calculateTurnoverRate(5, 0);
  assert.equal(zeroResult.status, 'invalid');
  assert.equal(zeroResult.rate, 0);

  const negativeResult = calculateTurnoverRate(-2, 50);
  assert.equal(negativeResult.status, 'invalid');
});

test('filterResources returns all when query is empty or spaces', () => {
  const all = filterResources(HR_RESOURCES, '  ');
  assert.equal(all.length, HR_RESOURCES.length);
});

test('filterResources filters by title and keywords correctly', () => {
  const digitalResults = filterResources(HR_RESOURCES, 'digital');
  assert.ok(digitalResults.some(r => r.title === 'Digital Recruitment'));

  const retentionResults = filterResources(HR_RESOURCES, 'retention');
  assert.ok(retentionResults.some(r => r.title === 'Retention Strategies'));

  const inclusiveResults = filterResources(HR_RESOURCES, 'inclusive');
  assert.ok(inclusiveResults.some(r => r.title === 'Inclusive Culture'));

  const noResults = filterResources(HR_RESOURCES, 'xyznonexistentterm999');
  assert.equal(noResults.length, 0);
});

test('HR_QUIZ_QUESTIONS has 3 valid questions with myths vs facts', () => {
  assert.equal(HR_QUIZ_QUESTIONS.length, 3);
  HR_QUIZ_QUESTIONS.forEach(q => {
    assert.ok(q.statement.length > 10);
    assert.ok(q.options.length >= 2);
    const correctCount = q.options.filter(o => o.isCorrect).length;
    assert.equal(correctCount, 1, `Question ${q.id} should have exactly 1 correct answer`);
    assert.ok(q.explanation.length > 10);
  });
});

test('LIFECYCLE_STAGES has 5 stages in order', () => {
  assert.equal(LIFECYCLE_STAGES.length, 5);
  const titles = LIFECYCLE_STAGES.map(s => s.title);
  assert.deepEqual(titles, ['Recruitment', 'Onboarding', 'Development', 'Retention', 'Offboarding']);
});
