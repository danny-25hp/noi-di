"""Tạo icon PNG cho app (không cần thư viện ngoài)."""
import zlib, struct, sys, os, math

def png(path, size):
    W = H = size
    bg = (255, 122, 69); white = (255, 255, 255)
    rows = []
    for y in range(H):
        row = bytearray([0])
        for x in range(W):
            u, v = x / W, y / H
            c = bg
            # bong bóng chat
            dx, dy = (u - 0.5) / 0.32, (v - 0.46) / 0.24
            in_bubble = dx * dx + dy * dy <= 1
            in_tail = 0.30 < u < 0.42 and 0.62 < v < 0.78 and (v - 0.62) < (0.42 - u) * 1.4
            if in_bubble or in_tail:
                c = white
                # 3 chấm
                for cx in (0.38, 0.5, 0.62):
                    if (u - cx) ** 2 + (v - 0.46) ** 2 < 0.04 ** 2:
                        c = bg
            row += bytes(c)
        rows.append(bytes(row))
    raw = b"".join(rows)
    def chunk(t, d):
        return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
    data = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", W, H, 8, 2, 0, 0, 0)) \
        + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
    open(path, "wb").write(data)

out = sys.argv[1]
for s in (180, 192, 512):
    png(os.path.join(out, f"icon-{s}.png"), s)
print("ok")
