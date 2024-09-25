const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
]

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
    // Base case: off the map
    if(curr.x < 0 || curr.x > maze[0].length ||
        curr.y < 0 || curr.y > maze.length) {
        return false;
    }
    if(maze[curr.y][curr.x] === wall) {
        return false;
    }
    if(curr.x == end.x && curr.y == end.y) {
        path.push(end)
        return true;
    }
    if(seen[curr.y][curr.x]) {
        return false;
    }

    seen[curr.y][curr.x] = true;
    path.push(curr);

    for(let i = 0; i < dir.length; ++i) {
        const [x, y] = dir[i];
        const next = {
            x: curr.x + x,
            y: curr.y + y
        }
        if(walk(maze, wall, next, end, seen, path)) {
            return true;
        }
    }

    path.pop();

    return false;

}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for(let i = 0; i < maze.length; ++i) {
        seen.push(new Array(maze[i].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}