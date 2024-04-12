// copied from: https://github.com/alibaba/hooks/blob/86ec5968c75df595432a45ddc8d224d008f41f3d/packages/hooks/src/useBoolean/__tests__/index.test.ts
import { useBoolean } from '../../src';
import { act, renderHook } from '../utils';

const setUp = (defaultValue?: boolean) => renderHook(() => useBoolean(defaultValue));

describe('useBoolean', () => {
  it('test on methods', async () => {
    const { result } = setUp();
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].setTrue();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1].setFalse();
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(false);
  });

  it('test on default value', () => {
    const hook1 = setUp(true);
    expect(hook1.result.current[0]).toBe(true);
    const hook2 = setUp();
    expect(hook2.result.current[0]).toBe(false);
    // @ts-ignore
    const hook3 = setUp(0);
    expect(hook3.result.current[0]).toBe(false);
    // @ts-ignore
    const hook4 = setUp('');
    expect(hook4.result.current[0]).toBe(false);
    // @ts-ignore
    const hook5 = setUp('hello');
    expect(hook5.result.current[0]).toBe(true);
  });
});