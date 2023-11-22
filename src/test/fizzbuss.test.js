import { describe, expect, it } from 'vitest';

const fizzbuss = num => {
	if (typeof num !== 'number') throw new Error();
};

describe('fizzbuss', () => {
	it('should be a function', () => {
		expect(typeof fizzbuss).toBe('function');
	});

	// it('should throw if not number is provided as parameter', () => {
	// 	expect(() => fizzbuss(1)).toThrow();
	// });
});
