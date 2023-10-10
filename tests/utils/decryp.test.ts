/* eslint-disable max-len */
import { expect } from 'chai';

import { decrypt } from '../../src/utils/decrypt';

// token: emitido 14/03/2022, expira: 14/03/2023
const token =
	'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..doopfQXc91Ch_oTxqzDJJw.Rw7_nNNr1tClNXES4c7P0Kn7-ibBzEL16mwrsShvEATf2cVtdozn0yWuIQibRx_xIe1QM4B8fTSuNanyL7vV4pLVYDOlSCdY7e1USNhEtxeIuP-hiI1-c2y6dNeJea4GHDJWzQXNRjYprJ_4qnXYp6zqc8L1NlkQq6ShJD0_DSkYDgw_G96XPT9wDFm8g487swlLz0otOFEFl6ooSnSXBv2mJt581OC3XEvWoQee7gRPzuB0f3AsO_ySEn6_arPAbVTXhh3emfWj0J_yZdIwPpm4DkjvN2En4QTZxGWFNerrLH0yox-eaF715sDEliqqEUO4_mi5if_dbISFlcCFjev2v8zmYaXE9juiraf_vQd7KTqN-KwSpxiPKe8Yv4LONamAUJ-hR8Hs3avJ6zFVwY0DBXs83kO2pGGXJTxNbr9YdTxDNMseG5pfMNEAw0EzHsG9uKuNPaLSZyRp8nC3RhHGBQcABouUC6tqpnZPoS9SF4awql0amPUSMgfkLKZkXIkGDwgR6LTOQt_nQrXwoCdAf-mPMVkT9qcejbTC1AgB6FschkDe2RIX6ppRlAimGO7bTIHf1bWQm7S_xFCoHCRB03upFpVAo1Z7uQl2KD4.UDRaffzA_PhMZC3gig1c6Q';
const tokenExpired =
	'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..LQJe-WDrClJWCYkcYzu3jQ.j-v9mW8r-OXmsHOYYeKA6qtJ_zKhyEJDXJHsAX-4d9uB0BndG0KuYWbWBjcOXr0APKUCNBtx1FtlYtsGVv3hA4tYO1CUqbZ1xiBOBYdWCU1PjIPo73y_lbklvgUbI7m4DY9TYtzn7FNx8LPVre9d2Ct_ZFpoh12JA0wqhcp0G_8ArozHycpmg7otcFKWEvP2pBPiDFzlcF9raW8ol0SDQ3oS0L7Khml0TE5jck_vAi-IcIqMWzXOi3RG4ZOw17ZJUfONXWH1opIKhhPfZbzOmIm52QBL9uYOQuUTWutLaO_cBf7vJtHQUrx2Es7JmgEkOjrpYg0u5pHdbOlp_J-vyyIFYmkp8bjohthcRQIrg0Emn4nEmU2TllbZ0k0E1fba5gk7BxEprH2unwfA1ri3NmV85g7YCH__A3p4OyIZwDvHDD98vnasl3wx_SSOX1cN6LP5ZsCKawCwo_a16lgyUkp3R0P80OthTEcYhzqOJjH9zX3qVswWGnyzbLOhX953FP9myVKhQVL5WUfCduhlXlvRmkevpSF7MpBskrpPAXVTzv8I56baeuoPR_0y1jub4D-wxgLKUSp_FvVxCfPEzjVhEFtbF_M3LJVEWodHdr5L6bLKDxRUp2M2WK7C7HO49yH-lT_QiqsPB8XI0PRZW0E5c0e96svCsDd0APrU45j5MRstofuSzapV3PtqU0YWm4LmWzESWZVwoT75i1tAQK9KV6dLGwfktDinP2ZatVRxyVjh0ufL5j1MTj75-nRhpY9tFCzRxeokhNiH3NeYkIXnUKSQroShPfDC88tBM8RqnQ3vgPPNMi9osSnDwrMTjmzKL1jfsdUTSETkV4Y_rvPQh0Mv1s0pUWuCd3ZP0jNqc36KtYifDAb6MJqm_UQaMzSvY5Y0B2WNdTmgjQcl3_xb9YDvCgi9gHA7vuZTyHo0PhDFomp6zkDHcq2DFU-c9ap0iGERPSbSQnGzJI_cgKsbm4sMZlFd7zTwgivPNErukji0IlmKokB6TSOoQrLyIGniVdshszcz-X6BDhXWtgb_oe6JE6HMtuRHW_tvRXbzIBCKXdZ1c--sINZZ_SWNt8539fCVNyR4P1eNAVyy9aE8IzbxmGQvNT05ehoROxevhWKBs16WJ-7R7AEFWp5LPN6ZkCs5UZ5KaDKGNCwPTjxbb2R97okXfxCYNQPc-JyWWaHGzefFMPkqjkSUPEaJ6ZWYdmsL57eIMm8FRdHCJnYEt7hb0K1XzNIbOtpjKIzs8q1RTRhLPfzrBn49DL9e9VjrBnuw6rVLJhjWED9MdRsJCbRm-Dg3UH6gKOeYjyD8J5yZWQ3BKjn1h3Q3beqJOSHy2T2tkTav3UjROt1MpM58L9xZhmToxSQKwcPjvYNrI9JFYmFX4U5JDbBKZBHQWW0Hhz8b4UwMeqjt1OV9Gw6Kl29USXQnOLadHRd-rQNiQ-hjHzxxFVn2VLmbXMTXD90-T-JoStkAaI9PwqN2htpKAGdLxQrgwQOQ72MJZkE.g0qEzWdA4tbom2fLo75ETg';
// tokenFailed: emitido 14/03/2022, expira: 14/03/2022
const tokenFailed =
	'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..R4Nq049j1rBVDyYYmBCsQA.h9yUgKTaNSvW7sTmsFPwCm57miESUq2xJjEHGY8YErTchwD-d32HBkCr7F76h-QkMdLMReqtnsESI7Dqm-eaNg.JfnlpXxQSeuNZjmrYR7xhA';
const password = process.env.APP_JWT_CLAVE || '';

describe('Decrypt token', () => {
	it('Error en desencriptacion', () => {
		const res = decrypt(token, '', 0);

		expect(res.IsSuccess).equal(false);
		expect(res.Message).equal('ERR_JWE_DECRYPTION_FAILED');
	});

	it('Token error en servidor', () => {
		const res = decrypt(tokenFailed, password, 99999);

		expect(res.IsSuccess).equal(false);
		expect(res.Message).equal('SERVER_ERROR');
	});

	it('Token expirado', () => {
		const res = decrypt(tokenExpired, password, 99999);

		expect(res.IsSuccess).equal(false);
		expect(res.Message).equal('TOKEN EXPIRED');
	});

	it('Sin autorizacion', () => {
		const res = decrypt(token, password, 99999);

		expect(res.IsSuccess).equal(false);
		expect(res.Message).equal('UNAUTHORIZED');
	});

	it('Token OK', () => {
		const res = decrypt(token, password, 9161);

		expect(res.IsSuccess).equal(true);
		expect(res.Message).equal('OK');
	});
});
