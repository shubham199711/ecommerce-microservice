# ["hello", "hi"] => "h"

# ["pencil","pen","pending"] => "pen"

# ["foo", "bar"] => ""

def check_valid_prefix_till_index(_list, mid):
    check_prefix = _list[0][:mid]
    for _str in _list:
        if not _str.startswith(check_prefix):
            return False
    return True


def largest_prefix(list_of_str: list[str]) -> str:
    l, r = 0, len(min(list_of_str, key=len))
    edge_ele = -1
    while l <= r:
        mid = (l + r) // 2
        if check_valid_prefix_till_index(list_of_str, mid):
            l = mid + 1
            edge_ele = mid
        else:
            r = mid - 1
    if edge_ele == -1:
        return ""
    return list_of_str[0][:edge_ele]



print(largest_prefix(["hello", "hi"]))
print(largest_prefix(["pencil","pen","pending"]))
print(largest_prefix(["foo", "bar"]))


